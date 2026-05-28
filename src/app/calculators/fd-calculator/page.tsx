import type { Metadata } from 'next';
import FDClient from './FDClient';

export const metadata: Metadata = {
  title: 'FD Calculator — Calculate Fixed Deposit Returns',
  description: 'Free FD Calculator — Calculate fixed deposit maturity amount and interest earned with different compounding frequencies.',
};

export default function FDCalculatorPage() { return <FDClient />; }
