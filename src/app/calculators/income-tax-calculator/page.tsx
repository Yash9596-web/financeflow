import type { Metadata } from 'next';
import IncomeTaxClient from './IncomeTaxClient';

export const metadata: Metadata = {
  title: 'Income Tax Calculator — Calculate Tax for FY 2024-25',
  description: 'Free Income Tax Calculator India — Calculate tax liability under old and new regime for FY 2024-25. Compare both regimes and find which saves more.',
};

export default function IncomeTaxPage() {
  return <IncomeTaxClient />;
}
