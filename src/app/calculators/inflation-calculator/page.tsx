import type { Metadata } from 'next';
import InflationClient from './InflationClient';

export const metadata: Metadata = {
  title: 'Inflation Calculator — See How Inflation Erodes Your Money',
  description: 'Free Inflation Calculator — See how inflation erodes purchasing power over time.',
};

export default function InflationPage() {
  return <InflationClient />;
}
