import type { Metadata } from 'next';
import GenericLoanCalc from '../GenericLoanCalc';

export const metadata: Metadata = { title: 'Education Loan Calculator', description: 'Free Education Loan Calculator — Plan education financing with EMI and cost breakdown.' };
export default function Page() { return <GenericLoanCalc slug="education-loan-calculator" title="Education Loan Calculator" icon="🎓" description="Calculate education loan EMI and repayment schedule." />; }
