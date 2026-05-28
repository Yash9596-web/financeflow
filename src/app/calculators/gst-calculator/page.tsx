import type { Metadata } from 'next';
import GSTClient from './GSTClient';

export const metadata: Metadata = {
  title: 'GST Calculator — Calculate GST Amount Instantly',
  description: 'Free GST Calculator — Add or remove GST instantly. Calculate CGST, SGST breakdown for any amount with invoice-style results.',
};

export default function GSTCalculatorPage() { return <GSTClient />; }
