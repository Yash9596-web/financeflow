import type { Metadata } from 'next';
import SIPClient from './SIPClient';

export const metadata: Metadata = {
  title: 'SIP Calculator — Calculate Mutual Fund Returns',
  description: 'Free SIP Calculator — Estimate your mutual fund returns with SIP calculator. View investment growth projection and wealth accumulation chart.',
};

export default function SIPCalculatorPage() {
  return <SIPClient />;
}
