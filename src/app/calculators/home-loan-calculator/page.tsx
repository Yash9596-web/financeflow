import type { Metadata } from 'next';
import GenericLoanCalc from '../GenericLoanCalc';

export const metadata: Metadata = { title: 'Home Loan Calculator — Calculate Housing Loan EMI', description: 'Free Home Loan EMI Calculator — Calculate monthly payments, total interest for housing loans.' };
export default function Page() { return <GenericLoanCalc slug="home-loan-calculator" title="Home Loan Calculator" icon="🏠" description="Calculate home loan EMI with detailed amortization schedule." />; }
