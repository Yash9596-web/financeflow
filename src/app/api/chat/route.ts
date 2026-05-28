import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const SYSTEM_PROMPT = `You are "FinanceFlow AI", a friendly, expert Indian financial advisor built into the FinanceFlow platform.

Your personality:
- Warm, approachable, and professional
- You explain complex financial concepts in simple language
- You use Indian context (INR, Indian tax laws, Indian mutual funds, Indian banks)
- You give actionable, specific advice — not vague generalities

Your expertise covers:
- Indian Income Tax (Old vs New Regime, Section 80C, 80D, HRA, NPS)
- Mutual Funds & SIP (Direct vs Regular, ELSS, Index Funds, Debt Funds)
- Fixed Deposits, Recurring Deposits, PPF, NPS, SSY
- Loans (Home Loan, Car Loan, Personal Loan, Education Loan — EMI, prepayment strategies)
- Insurance (Term Life, Health Insurance, ULIPs vs Mutual Funds)
- Stock Market basics (Nifty 50, Sensex, Demat accounts)
- Budgeting (50/30/20 rule, emergency fund, debt management)
- Gold Investment (Sovereign Gold Bonds, Digital Gold, Gold ETFs)
- Real Estate basics
- Retirement Planning (FIRE, corpus calculation)
- GST basics for small businesses

Rules:
1. Always use ₹ (INR) for amounts unless the user specifies another currency
2. When recommending investments, always mention risk level
3. Add a brief disclaimer when giving tax advice: "Please verify with a CA for your specific situation"
4. If asked about specific stocks or crypto, remind users you provide general guidance, not buy/sell recommendations
5. Keep responses concise but thorough — use bullet points and bold for key numbers
6. When relevant, suggest FinanceFlow calculators (e.g., "You can use our SIP Calculator to plan this")
7. Format responses with markdown for readability (bold, bullet points, headers)
8. If the user shares their salary/income, help them build a complete financial plan
9. Always be encouraging — personal finance is a journey, not a destination`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
];

// Call Groq API (Primary Ultra-Fast AI)
async function callGroq(messages: ChatMessage[]): Promise<Response> {
  const url = 'https://api.groq.com/openai/v1/chat/completions';
  
  const payload = {
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ],
    temperature: 0.7,
    max_tokens: 4096,
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

// Call Gemini API (Robust Fallback Chain)
async function callGemini(contents: object[], modelIndex = 0, retryCount = 0): Promise<Response> {
  const model = GEMINI_MODELS[modelIndex] || GEMINI_MODELS[0];
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  const generationConfig: any = {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 4096,
  };

  if (model.includes('2.5')) {
    generationConfig.thinkingConfig = {
      thinkingBudget: 0,
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig,
    }),
  });

  if (response.status === 429) {
    // Try next model first
    if (modelIndex + 1 < GEMINI_MODELS.length) {
      return callGemini(contents, modelIndex + 1, 0);
    }
    // If all models exhausted, retry with delay (up to 2 retries)
    if (retryCount < 2) {
      await new Promise(resolve => setTimeout(resolve, (retryCount + 1) * 5000));
      return callGemini(contents, 0, retryCount + 1);
    }
  }

  return response;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!messages.length) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    // 1. Try Groq (Primary Ultra-Fast Option)
    if (GROQ_API_KEY) {
      try {
        console.log('Routing chat request to Groq (Llama 3.3)...');
        const groqResponse = await callGroq(messages);
        
        if (groqResponse.ok) {
          const data = await groqResponse.json();
          const aiText = data?.choices?.[0]?.message?.content;
          if (aiText) {
            console.log('Successfully received response from Groq!');
            return NextResponse.json({ message: aiText });
          }
        } else {
          const errText = await groqResponse.text();
          console.warn('Groq API returned an error status:', groqResponse.status, errText);
          console.log('Falling back to Gemini...');
        }
      } catch (groqError) {
        console.error('Groq call failed with exception, falling back to Gemini:', groqError);
      }
    }

    // 2. Try Gemini (Robust Fallback / Secondary Option)
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'AI advisor keys not configured. Please check your .env.local file.' }, { status: 500 });
    }

    console.log('Routing chat request to Gemini...');
    // Build Gemini-compatible conversation
    const contents = [];
    for (const msg of messages) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      });
    }

    const response = await callGemini(contents);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);

      if (response.status === 429) {
        return NextResponse.json({
          error: 'The AI advisor is receiving too many requests right now. Please wait 30 seconds and try again.'
        }, { status: 429 });
      }

      return NextResponse.json({ error: 'AI service temporarily unavailable. Please try again.' }, { status: 502 });
    }

    const data = await response.json();
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, I couldn\'t generate a response. Please try rephrasing your question.';

    return NextResponse.json({ message: aiText });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
