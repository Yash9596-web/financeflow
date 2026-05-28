import type { Metadata } from 'next';
import GenericLoanCalc from '../GenericLoanCalc';

export const metadata: Metadata = { title: 'Personal Loan Calculator', description: 'Free Personal Loan EMI Calculator — Estimate monthly payments for personal loans.' };
export default function Page() { return <GenericLoanCalc slug="personal-loan-calculator" title="Personal Loan Calculator" icon="👤" description="Calculate personal loan EMI and interest cost." />; }
