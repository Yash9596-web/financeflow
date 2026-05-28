'use client';
import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: number;
}

const SUGGESTIONS = [
  {
    title: '📊 Plan an Investment',
    desc: 'Suggest a mutual fund SIP strategy for ₹10,000/month based on moderate risk.',
    prompt: 'Suggest a mutual fund SIP strategy for ₹10,000/month based on moderate risk.'
  },
  {
    title: '📋 Optimize My Taxes',
    desc: 'Compare the Old vs New tax regimes for an annual salary of ₹12 Lakhs.',
    prompt: 'Compare the Old vs New tax regimes for an annual salary of ₹12 Lakhs.'
  },
  {
    title: '🏠 Afford a Home',
    desc: 'Calculate how much home loan I can afford on a ₹80,000 monthly salary.',
    prompt: 'Calculate how much home loan I can afford on a ₹80,000 monthly salary.'
  },
  {
    title: '🎯 Retirement Strategy',
    desc: 'How can I build a ₹2 Crore retirement corpus in India in 20 years?',
    prompt: 'How can I build a ₹2 Crore retirement corpus in India in 20 years?'
  }
];

export default function AIAdvisorClient() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const chatViewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('financeflow_chats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Conversation[];
        if (parsed.length > 0) {
          // Sort conversations by timestamp (most recent first)
          const sorted = parsed.sort((a, b) => b.timestamp - a.timestamp);
          setConversations(sorted);
          setActiveConversationId(sorted[0].id);
          setMessages(sorted[0].messages);
          return;
        }
      } catch (e) {
        console.error('Error loading conversations:', e);
      }
    }

    // Default chat setup if none exist
    const defaultChat: Conversation = {
      id: 'chat-' + Date.now(),
      title: 'Investment Advisory',
      messages: [],
      timestamp: Date.now()
    };
    setConversations([defaultChat]);
    setActiveConversationId(defaultChat.id);
    setMessages([]);
  }, []);

  // Scroll internal viewport to bottom when messages or loading state changes
  useEffect(() => {
    if (chatViewportRef.current) {
      chatViewportRef.current.scrollTo({
        top: chatViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Auto-update conversation title if it's the first user message
    let chatTitle = 'New Advisory';
    const isFirstUserMessage = messages.filter(m => m.role === 'user').length === 0;
    if (isFirstUserMessage) {
      chatTitle = text.length > 24 ? text.substring(0, 24) + '...' : text;
    }

    const updatedConversations = conversations.map(c => {
      if (c.id === activeConversationId) {
        return {
          ...c,
          title: isFirstUserMessage ? chatTitle : c.title,
          messages: updatedMessages,
          timestamp: Date.now()
        };
      }
      return c;
    });

    setConversations(updatedConversations);
    localStorage.setItem('financeflow_chats', JSON.stringify(updatedConversations));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (res.ok && data.message) {
        const assistantMessage: ChatMessage = { role: 'assistant', content: data.message };
        const finalMessages = [...updatedMessages, assistantMessage];
        setMessages(finalMessages);

        const finalConversations = updatedConversations.map(c => {
          if (c.id === activeConversationId) {
            return {
              ...c,
              messages: finalMessages,
              timestamp: Date.now()
            };
          }
          return c;
        });

        // Re-sort to put the active conversation at the top of history
        const sorted = finalConversations.sort((a, b) => b.timestamp - a.timestamp);
        setConversations(sorted);
        localStorage.setItem('financeflow_chats', JSON.stringify(sorted));
      } else {
        const errMsg: ChatMessage = { role: 'assistant', content: `⚠️ ${data.error || 'Something went wrong. Please try again.'}` };
        setMessages(prev => [...prev, errMsg]);
      }
    } catch {
      const netMsg: ChatMessage = { role: 'assistant', content: '⚠️ Network error. Please check your connection and try again.' };
      setMessages(prev => [...prev, netMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const startNewChat = () => {
    const newChat: Conversation = {
      id: 'chat-' + Date.now(),
      title: 'New Advisory',
      messages: [],
      timestamp: Date.now()
    };
    const updated = [newChat, ...conversations];
    setConversations(updated);
    setActiveConversationId(newChat.id);
    setMessages([]);
    localStorage.setItem('financeflow_chats', JSON.stringify(updated));
  };

  const selectConversation = (id: string) => {
    const selected = conversations.find(c => c.id === id);
    if (selected) {
      setActiveConversationId(id);
      setMessages(selected.messages);
    }
  };

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = conversations.filter(c => c.id !== id);
    setConversations(filtered);
    localStorage.setItem('financeflow_chats', JSON.stringify(filtered));

    if (activeConversationId === id) {
      if (filtered.length > 0) {
        setActiveConversationId(filtered[0].id);
        setMessages(filtered[0].messages);
      } else {
        const defaultChat: Conversation = {
          id: 'chat-' + Date.now(),
          title: 'Investment Advisory',
          messages: [],
          timestamp: Date.now()
        };
        setConversations([defaultChat]);
        setActiveConversationId(defaultChat.id);
        setMessages([]);
        localStorage.setItem('financeflow_chats', JSON.stringify([defaultChat]));
      }
    }
  };

  // Simple but robust line-by-line markdown parser
  const renderContent = (text: string) => {
    const parseInline = (str: string): string => {
      let html = str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
      return html;
    };

    const lines = text.split('\n');
    const renderedLines = lines.map(line => {
      let parsedLine = line;
      let isBullet = false;
      let isNumbered = false;
      let listNum = '';

      if (parsedLine.startsWith('### ')) {
        const content = parseInline(parsedLine.slice(4));
        return `<h4 style="margin:1rem 0 0.4rem;font-size:1rem;color:var(--primary);font-weight:700">${content}</h4>`;
      }
      if (parsedLine.startsWith('## ')) {
        const content = parseInline(parsedLine.slice(3));
        return `<h3 style="margin:1.25rem 0 0.5rem;font-size:1.1rem;color:var(--primary);font-weight:700">${content}</h3>`;
      }
      if (parsedLine.startsWith('# ')) {
        const content = parseInline(parsedLine.slice(2));
        return `<h2 style="margin:1.5rem 0 0.75rem;font-size:1.25rem;color:var(--primary);font-weight:800">${content}</h2>`;
      }

      if (parsedLine.startsWith('- ') || parsedLine.startsWith('* ')) {
        isBullet = true;
        parsedLine = parsedLine.slice(2);
      } else {
        const numMatch = parsedLine.match(/^(\d+)\.\s(.*)$/);
        if (numMatch) {
          isNumbered = true;
          listNum = numMatch[1];
          parsedLine = numMatch[2];
        }
      }

      const content = parseInline(parsedLine);

      if (isBullet) {
        return `<div style="display:flex;gap:8px;margin:3px 0;align-items:flex-start"><span style="color:var(--primary);margin-top:2px">•</span><span>${content}</span></div>`;
      }
      if (isNumbered) {
        return `<div style="display:flex;gap:8px;margin:3px 0;align-items:flex-start"><span style="color:var(--primary);font-weight:600;min-width:18px">${listNum}.</span><span>${content}</span></div>`;
      }

      return content;
    });

    return renderedLines.join('<br/>');
  };

  const showSplash = messages.filter(m => m.role === 'user').length === 0 && !isLoading;

  return (
    <div className="dashboard-container">
      {/* Sidebar Panel */}
      <div className={`advisor-sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <button onClick={startNewChat} className="new-chat-btn">
            <span>➕</span> New Chat
          </button>
        </div>

        <div className="sidebar-history-container">
          <p className="sidebar-title">Recent Inquiries</p>
          <div className="sidebar-history-list">
            {conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => selectConversation(c.id)}
                className={`history-item ${activeConversationId === c.id ? 'active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, overflow: 'hidden' }}>
                  <span>💬</span>
                  <span className="history-text">{c.title}</span>
                </div>
                <button
                  onClick={(e) => deleteConversation(c.id, e)}
                  className="delete-chat-btn"
                  title="Delete Conversation"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-shortcut-title">🧮 Calculator Shortcuts</div>
          <div className="shortcut-grid">
            <a href="/calculators/sip-calculator" className="shortcut-link">SIP Plan</a>
            <a href="/calculators/emi-calculator" className="shortcut-link">EMI Check</a>
            <a href="/calculators/income-tax-calculator" className="shortcut-link">Tax Save</a>
          </div>
        </div>
      </div>

      {/* Workspace Panel */}
      <div className="workspace-panel">
        {/* Workspace Header */}
        <div className="workspace-header">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="sidebar-toggle-btn"
            title={isSidebarOpen ? 'Hide History' : 'Show History'}
          >
            ☰
          </button>
          
          <div className="ai-advisor-brand">
            <span className="brand-dot animate-pulse-glow"></span>
            <div>
              <h3 style={{ fontSize: '0.975rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                FinanceFlow AI Advisor
              </h3>
              <p style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600, margin: 0 }}>
                Online • Multi-Core Routing Active
              </p>
            </div>
          </div>

          <div className="routing-badge">
            ⚡ Ultra-Speed LPU
          </div>
        </div>

        {/* Scrollable Chat Area */}
        <div ref={chatViewportRef} className="chat-viewport">
          {showSplash ? (
            /* Splash Screen (Welcome State) */
            <div className="splash-viewport">
              <div className="glowing-ai-orb"></div>
              <h2 className="wealth-greeting">Hello, Wealth Builder.</h2>
              <p className="wealth-subtitle">
                I am your FinanceFlow AI Advisor. How can I help you manage your budget, invest in mutual funds, or optimize your taxes today?
              </p>

              <div className="suggestions-dashboard-grid">
                {SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(s.prompt)}
                    className="suggestion-glass-card"
                  >
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                    <span className="card-click-hint">Click to ask ➔</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Chat Message Stream */
            <div className="message-container">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message-row ${msg.role === 'user' ? 'user-align' : 'assistant-align'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="advisor-avatar">
                      🤖
                    </div>
                  )}

                  <div className={`message-bubble ${msg.role === 'user' ? 'user-bubble' : 'assistant-bubble'}`}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <div
                        className="markdown-rendered-body"
                        dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                      />
                    )}
                  </div>
                </div>
              ))}

              {/* Shimmering generation loading state */}
              {isLoading && (
                <div className="message-row assistant-align">
                  <div className="advisor-avatar advisor-avatar-spinning">
                    🤖
                  </div>
                  <div className="message-bubble assistant-bubble">
                    <div className="shimmering-loading-container">
                      <div className="shimmering-line line-1"></div>
                      <div className="shimmering-line line-2"></div>
                      <div className="shimmering-line line-3"></div>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          )}
        </div>

        {/* Floating Chat Box Input Area */}
        <div className="input-panel-container">
          <form onSubmit={handleSend} className="chat-input-pill">
            <span className="chat-input-decoration" title="Financial Advisor Core">💰</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? 'Thinking...' : 'Ask about budgeting, mutual funds, or tax regimes...'}
              disabled={isLoading}
              className="chat-pill-input"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`chat-pill-send-btn ${!input.trim() || isLoading ? 'disabled' : ''}`}
              title="Send Message"
            >
              ➔
            </button>
          </form>
          <p className="disclaimer-text">
            FinanceFlow AI can make mistakes. Verify critical tax strategies or investment decisions with a chartered accountant (CA).
          </p>
        </div>
      </div>

      <style>{`
        /* ===== DASHBOARD CONTAINER LAYOUT ===== */
        .dashboard-container {
          --advisor-bg: #ffffff;
          --advisor-sidebar-bg: #f8fafc;
          --advisor-border: #e5e7eb;
          --advisor-card: #ffffff;
          --advisor-card-hover: #f1f5f9;
          --advisor-text: #111827;
          --advisor-text-muted: #6b7280;
          --advisor-input: #f8fafc;

          display: flex;
          height: 720px;
          background: var(--advisor-bg);
          border: 1px solid var(--advisor-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
          margin-top: 1rem;
          font-family: var(--font-family);
          transition: all 0.3s ease;
        }

        /* Premium Dark Black Theme Suite Overrides */
        [data-theme="dark"] .dashboard-container {
          --advisor-bg: #090d16;          /* Deep rich space black background */
          --advisor-sidebar-bg: #0f1422;  /* Slate black for sidebar history list */
          --advisor-border: #1e293b;      /* Sleek dark border line */
          --advisor-card: #121826;        /* Jet/Slate black cards */
          --advisor-card-hover: #1b2336;  /* High-fidelity slate hover */
          --advisor-text: #f8fafc;        /* High-contrast soft white text */
          --advisor-text-muted: #94a3b8;  /* Clean muted grey text */
          --advisor-input: #0e1320;       /* Rich black input box background */
        }

        /* ===== SIDEBAR PANEL STYLING ===== */
        .advisor-sidebar {
          width: 260px;
          background: var(--advisor-sidebar-bg);
          border-right: 1px solid var(--advisor-border);
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease, min-width 0.3s ease, opacity 0.3s ease;
          overflow: hidden;
          flex-shrink: 0;
          will-change: width, min-width, opacity;
          transform: translate3d(0, 0, 0);
        }

        .advisor-sidebar.collapsed {
          width: 0;
          min-width: 0;
          border-right: none;
          opacity: 0;
        }

        .sidebar-header {
          padding: 1.25rem 1rem;
          display: flex;
          justify-content: center;
        }

        .new-chat-btn {
          width: 100%;
          background: var(--advisor-card);
          border: 1px solid var(--advisor-border);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--advisor-text);
          box-shadow: var(--shadow-xs);
        }

        .new-chat-btn:hover {
          border-color: #16a34a;
          background: var(--advisor-card-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        .sidebar-history-container {
          flex: 1;
          padding: 0.5rem 0.75rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .sidebar-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--advisor-text-muted);
          padding: 0 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.25rem;
        }

        .sidebar-history-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .history-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          cursor: pointer;
          color: var(--advisor-text-muted);
          transition: all 0.15s ease;
          overflow: hidden;
        }

        .history-item:hover, .history-item.active {
          background: var(--advisor-card-hover);
          color: var(--primary);
        }

        .history-item.active {
          font-weight: 600;
          background: rgba(22, 163, 74, 0.12);
        }

        .history-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .delete-chat-btn {
          opacity: 0;
          padding: 2px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
          background: transparent;
        }

        .history-item:hover .delete-chat-btn {
          opacity: 0.65;
        }

        .delete-chat-btn:hover {
          opacity: 1 !important;
          transform: scale(1.15);
        }

        .sidebar-footer {
          padding: 1rem 0.75rem;
          border-top: 1px solid var(--advisor-border);
          background: rgba(0,0,0,0.01);
        }

        .sidebar-shortcut-title {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--advisor-text-muted);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-left: 0.25rem;
        }

        .shortcut-grid {
          display: flex;
          gap: 6px;
        }

        .shortcut-link {
          flex: 1;
          padding: 6px 4px;
          background: var(--advisor-card);
          border: 1px solid var(--advisor-border);
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          text-align: center;
          font-weight: 600;
          color: var(--advisor-text-muted);
          transition: all 0.2s ease;
        }

        .shortcut-link:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--advisor-card-hover);
        }

        /* ===== WORKSPACE PANEL STYLING ===== */
        .workspace-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--advisor-bg);
          position: relative;
          overflow: hidden;
        }

        .workspace-header {
          height: 60px;
          border-bottom: 1px solid var(--advisor-border);
          padding: 0 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--advisor-bg);
          z-index: 10;
        }

        .sidebar-toggle-btn {
          font-size: 1.25rem;
          cursor: pointer;
          color: var(--advisor-text-muted);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          transition: background 0.2s ease, color 0.2s ease;
        }

        .sidebar-toggle-btn:hover {
          background: var(--advisor-card-hover);
          color: var(--advisor-text);
        }

        .ai-advisor-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #16a34a;
          display: inline-block;
          box-shadow: 0 0 8px rgba(22, 163, 74, 0.6);
        }

        .routing-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--primary);
          background: var(--primary-glow);
          padding: 4px 8px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(22, 163, 74, 0.15);
        }

        /* ===== CHAT VIEWPORT ===== */
        .chat-viewport {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        /* ===== SPLASH WELCOME STATE (GEMINI LOOK) ===== */
        .splash-viewport {
          margin: auto;
          max-width: 720px;
          width: 100%;
          text-align: center;
          padding: 2rem 0;
          animation: fadeIn 0.5s ease-out;
        }

        .glowing-ai-orb {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: radial-gradient(circle, #22c55e 0%, #10b981 40%, #2563eb 100%);
          filter: blur(8px);
          box-shadow: 0 0 35px rgba(16, 185, 129, 0.65), 0 0 70px rgba(37, 99, 235, 0.45);
          animation: pulseGlow 5s ease-in-out infinite;
          margin: 0 auto 1.5rem;
          will-change: transform, filter, box-shadow;
          transform: translate3d(0, 0, 0);
        }

        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.8; filter: blur(8px); }
          50% { transform: scale(1.12); opacity: 1; filter: blur(6px); box-shadow: 0 0 45px rgba(16, 185, 129, 0.85), 0 0 90px rgba(37, 99, 235, 0.6); }
        }

        .wealth-greeting {
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 45%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .wealth-subtitle {
          color: var(--advisor-text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 540px;
          margin: 0 auto 2rem;
        }

        .suggestions-dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          width: 100%;
          text-align: left;
        }

        .suggestion-glass-card {
          background: var(--advisor-card);
          border: 1px solid var(--advisor-border);
          border-radius: var(--radius-lg);
          padding: 1.15rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-xs);
        }

        .suggestion-glass-card:hover {
          transform: translateY(-3px);
          border-color: #10b981;
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.08);
          background: var(--advisor-card-hover);
        }

        .suggestion-glass-card h4 {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--advisor-text);
          margin-bottom: 0.25rem;
        }

        .suggestion-glass-card p {
          font-size: 0.78rem;
          color: var(--advisor-text-muted);
          line-height: 1.45;
          margin-bottom: 0.5rem;
        }

        .card-click-hint {
          font-size: 0.72rem;
          color: var(--primary);
          font-weight: 600;
          opacity: 0;
          transform: translateX(-4px);
          display: inline-block;
          transition: all 0.2s ease;
        }

        .suggestion-glass-card:hover .card-click-hint {
          opacity: 1;
          transform: translateX(0);
        }

        /* ===== MESSAGES STREAM (GEMINI BUBBLE-LESS LOOK) ===== */
        .message-container {
          max-width: 760px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .message-row {
          display: flex;
          width: 100%;
          gap: 12px;
          animation: fadeIn 0.3s ease;
        }

        .user-align {
          justify-content: flex-end;
        }

        .assistant-align {
          justify-content: flex-start;
        }

        .advisor-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
        }

        .advisor-avatar-spinning {
          animation: spin 3s linear infinite;
        }

        .message-bubble {
          font-size: 0.93rem;
          line-height: 1.65;
          word-break: break-word;
        }

        /* User Bubble - styled pill bubble on the right */
        .user-bubble {
          background: var(--advisor-sidebar-bg);
          border: 1px solid var(--advisor-border);
          color: var(--advisor-text);
          padding: 0.75rem 1.15rem;
          border-radius: var(--radius-xl) var(--radius-xl) 4px var(--radius-xl);
          max-width: 80%;
          box-shadow: var(--shadow-xs);
        }

        /* Assistant Bubble - spacious flow directly on background without border card (Gemini Style!) */
        .assistant-bubble {
          color: var(--advisor-text);
          padding: 0.25rem 0.25rem 0.25rem 0;
          flex: 1;
          max-width: calc(100% - 44px);
        }

        .markdown-rendered-body {
          color: var(--advisor-text);
        }

        /* ===== SHIMMERING LOADING EFFECT ===== */
        .shimmering-loading-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          padding-top: 6px;
        }

        .shimmering-line {
          height: 12px;
          background: linear-gradient(90deg, var(--advisor-sidebar-bg) 25%, var(--advisor-border) 50%, var(--advisor-sidebar-bg) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: var(--radius-sm);
        }

        .line-1 { width: 40%; }
        .line-2 { width: 85%; }
        .line-3 { width: 65%; }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* ===== INPUT PANEL ===== */
        .input-panel-container {
          padding: 1.25rem;
          background: var(--advisor-bg);
          border-top: 1px solid var(--advisor-border);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 10;
        }

        .chat-input-pill {
          max-width: 760px;
          width: 100%;
          background: var(--advisor-input);
          border: 1.5px solid var(--advisor-border);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          padding: 4px 6px 4px 16px;
          transition: all 0.2s ease;
        }

        .chat-input-pill:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow);
          background: var(--advisor-card);
        }

        .chat-input-decoration {
          font-size: 1.15rem;
          margin-right: 10px;
          user-select: none;
        }

        .chat-pill-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--advisor-text);
          font-size: 0.95rem;
          padding: 0.75rem 0;
        }

        .chat-pill-input::placeholder {
          color: var(--text-light);
        }

        .chat-pill-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--primary-gradient);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(22, 163, 74, 0.3);
        }

        .chat-pill-send-btn:hover:not(.disabled) {
          transform: scale(1.05);
          box-shadow: 0 2px 10px rgba(22, 163, 74, 0.5);
        }

        .chat-pill-send-btn.disabled {
          background: var(--advisor-border) !important;
          color: var(--text-light) !important;
          box-shadow: none !important;
          cursor: not-allowed;
        }

        .disclaimer-text {
          font-size: 0.7rem;
          color: var(--advisor-text-muted);
          text-align: center;
          max-width: 600px;
          margin: 0;
          line-height: 1.4;
        }

        /* ===== RESPONSIVENESS AND DRAWERS ===== */
        @media (max-width: 1024px) {
          .suggestions-dashboard-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 860px) {
          .dashboard-container {
            height: calc(100vh - var(--nav-height) - 2rem);
            border-radius: var(--radius-md);
          }

          .advisor-sidebar {
            position: absolute;
            left: 0;
            top: 60px;
            bottom: 0;
            z-index: 100;
            box-shadow: 8px 0 24px rgba(0,0,0,0.25);
            background: var(--advisor-sidebar-bg);
            border-right: 1px solid var(--advisor-border);
          }

          .advisor-sidebar.open {
            width: 250px;
          }

          .suggestions-dashboard-grid {
            grid-template-columns: 1fr;
          }
          
          .workspace-header {
            padding: 0 0.75rem;
          }
          
          .chat-viewport {
            padding: 1rem;
          }
          
          .input-panel-container {
            padding: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .dashboard-container {
            height: calc(100vh - var(--nav-height) - 1rem);
            margin-top: 0.5rem;
            border-radius: var(--radius-sm);
            border: none;
          }

          .workspace-header {
            height: 50px;
            padding: 0 0.5rem;
          }
          
          .workspace-header h3 {
            font-size: 0.85rem !important;
          }
          
          .workspace-header p {
            font-size: 0.65rem !important;
          }

          .routing-badge {
            font-size: 0.6rem;
            padding: 3px 6px;
          }

          .chat-viewport {
            padding: 0.75rem;
          }

          .splash-viewport {
            padding: 1rem 0;
          }

          .glowing-ai-orb {
            width: 50px;
            height: 50px;
            margin-bottom: 1rem;
          }

          .wealth-greeting {
            font-size: 1.5rem;
          }

          .wealth-subtitle {
            font-size: 0.82rem;
            margin-bottom: 1.25rem;
          }

          .suggestion-glass-card {
            padding: 0.875rem;
          }

          .suggestion-glass-card h4 {
            font-size: 0.82rem;
          }

          .suggestion-glass-card p {
            font-size: 0.72rem;
          }

          .message-bubble {
            font-size: 0.85rem;
            line-height: 1.55;
          }

          .user-bubble {
            max-width: 90%;
            padding: 0.625rem 1rem;
          }

          .input-panel-container {
            padding: 0.5rem;
          }

          .chat-input-pill {
            padding: 3px 4px 3px 12px;
          }

          .chat-pill-input {
            font-size: 0.85rem;
            padding: 0.625rem 0;
          }

          .chat-pill-send-btn {
            width: 34px;
            height: 34px;
            font-size: 0.875rem;
          }

          .chat-input-decoration {
            font-size: 1rem;
            margin-right: 6px;
          }

          .disclaimer-text {
            font-size: 0.6rem;
          }

          .advisor-sidebar.open {
            width: 220px;
          }

          .sidebar-footer {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
