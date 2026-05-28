import type { Metadata } from 'next';
import SalaryClient from './SalaryClient';

export const metadata: Metadata = {
  title: 'Salary Calculator — CTC to In-Hand Salary',
  description: 'Free Salary Calculator — Calculate net salary, take-home pay from CTC. View PF, tax deductions breakdown.',
};

export default function SalaryPage() {
  return <SalaryClient />;
}
