import type { Metadata } from 'next';
import EMIClient from './EMIClient';

export const metadata: Metadata = {
  title: 'EMI Calculator — Calculate Loan EMI Instantly',
  description: 'Free EMI Calculator — Calculate monthly EMI for home, car, and personal loans instantly. View amortization schedule, interest breakdown, and repayment charts.',
  keywords: ['emi calculator', 'loan emi calculator', 'home loan emi', 'car loan emi', 'personal loan emi', 'emi calculation'],
};

export default function EMICalculatorPage() {
  return <EMIClient />;
}
