import type { Metadata } from 'next';
import GenericLoanCalc from '../GenericLoanCalc';

export const metadata: Metadata = { title: 'Car Loan Calculator — Calculate Car Loan EMI', description: 'Free Car Loan EMI Calculator — Calculate monthly car loan payments and interest cost.' };
export default function Page() { return <GenericLoanCalc slug="car-loan-calculator" title="Car Loan Calculator" icon="🚗" description="Calculate car loan EMI and total repayment amount." />; }
