import CalculatorLayout from '@/components/CalculatorLayout';
import EMIClient from '@/app/calculators/emi-calculator/EMIClient';
import SIPClient from '@/app/calculators/sip-calculator/SIPClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const runtime = 'edge';
// Mock database of programmatic pages
// In a real scenario, this would come from a Headless CMS or Database
const programmaticPages: Record<string, { title: string, desc: string, type: string, modifier: string }> = {
  'home-loan-emi-calculator-sbi': {
    title: 'SBI Home Loan EMI Calculator',
    desc: 'Calculate your State Bank of India (SBI) home loan EMI instantly with our accurate calculator. View amortization schedules and interest breakdown.',
    type: 'emi',
    modifier: 'SBI'
  },
  'home-loan-emi-calculator-mumbai': {
    title: 'Home Loan EMI Calculator Mumbai',
    desc: 'Planning to buy a house in Mumbai? Calculate your home loan EMI with latest interest rates for properties in Mumbai.',
    type: 'emi',
    modifier: 'Mumbai'
  },
  'sip-calculator-for-students': {
    title: 'SIP Calculator for Students',
    desc: 'Start investing early! Calculate how small monthly SIP investments can build huge wealth for students.',
    type: 'sip',
    modifier: 'Students'
  }
};



export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = programmaticPages[resolvedParams.slug];
  if (!data) return {};
  
  return {
    title: `${data.title} | FinanceFlow`,
    description: data.desc,
  };
}

export default async function ProgrammaticSEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = programmaticPages[resolvedParams.slug];
  
  if (!data) {
    notFound();
  }

  // Determine which calculator to render based on type
  let CalculatorComponent = null;
  if (data.type === 'emi') {
    CalculatorComponent = <EMIClient />;
  } else if (data.type === 'sip') {
    CalculatorComponent = <SIPClient />;
  }

  return (
    <CalculatorLayout 
      slug={`p/${resolvedParams.slug}`}
      title={data.title}
      description={data.desc}
      icon="📈"
      faqItems={[
        { question: `How accurate is this ${data.modifier} calculator?`, answer: 'Our calculator uses standard mathematical formulas used by banks. However, actual rates may vary slightly based on hidden fees or specific branch policies.' },
        { question: `Is my data safe?`, answer: 'Yes, all calculations happen locally in your browser. We do not store or transmit your financial inputs.' }
      ]}
    >
      <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--primary)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Tailored for {data.modifier}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>This tool has been specifically optimized to help you calculate and plan for your {data.modifier} requirements.</p>
      </div>
      
      {CalculatorComponent}
    </CalculatorLayout>
  );
}
