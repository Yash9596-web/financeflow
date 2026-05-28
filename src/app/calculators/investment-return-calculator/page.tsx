import type { Metadata } from 'next';
import InvestmentReturnClient from './InvestmentReturnClient';

export const metadata: Metadata = {
  title: 'Investment Return Calculator — Calculate Lumpsum Returns',
  description: 'Free Investment Return Calculator — Calculate lumpsum investment growth with compound returns over time.',
};

export default function InvestmentReturnPage() {
  return <InvestmentReturnClient />;
}
