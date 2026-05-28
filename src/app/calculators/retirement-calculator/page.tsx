import type { Metadata } from 'next';
import RetirementClient from './RetirementClient';

export const metadata: Metadata = {
  title: 'Retirement Calculator — Plan Your Retirement Corpus',
  description: 'Free Retirement Calculator — Calculate retirement corpus needed and monthly savings required for a secure future.',
};

export default function RetirementPage() {
  return <RetirementClient />;
}
