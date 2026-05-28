import type { Metadata } from 'next';
import CurrencyClient from './CurrencyClient';

export const metadata: Metadata = {
  title: 'Currency Converter — Convert Major Currencies Instantly',
  description: 'Free Currency Converter — Convert between INR, USD, EUR, GBP and other major currencies with real-time accuracy.',
};

export default function CurrencyPage() {
  return <CurrencyClient />;
}
