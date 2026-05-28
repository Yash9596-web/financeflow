import type { Metadata } from 'next';
import GenericLoanCalc from '../GenericLoanCalc';

export const metadata: Metadata = { title: 'Credit Card EMI Calculator', description: 'Free Credit Card EMI Calculator — Convert credit card outstanding into manageable EMIs.' };
export default function Page() { return <GenericLoanCalc slug="credit-card-emi-calculator" title="Credit Card EMI Calculator" icon="💳" description="Convert credit card bills into easy EMIs." />; }
