import type { Metadata } from 'next';
import LoanEligibilityClient from './LoanEligibilityClient';

export const metadata: Metadata = {
  title: 'Loan Eligibility Calculator — Check Your Maximum Loan Amount',
  description: 'Free Loan Eligibility Calculator — Check maximum loan amount based on your income and existing obligations.',
};

export default function LoanEligibilityPage() {
  return <LoanEligibilityClient />;
}

