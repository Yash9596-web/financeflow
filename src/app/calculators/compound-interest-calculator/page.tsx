import type { Metadata } from 'next';
import CompoundInterestClient from './CompoundInterestClient';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Calculate CI with Different Frequencies',
  description: 'Free Compound Interest Calculator — Calculate compound interest with monthly, quarterly, or yearly compounding.',
};

export default function CompoundInterestPage() {
  return <CompoundInterestClient />;
}
