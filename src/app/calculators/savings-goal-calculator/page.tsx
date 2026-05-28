import type { Metadata } from 'next';
import SavingsGoalClient from './SavingsGoalClient';

export const metadata: Metadata = {
  title: 'Savings Goal Calculator — Plan Your Financial Goals',
  description: 'Free Savings Goal Calculator — Find out how much to save monthly to reach your financial goal.',
};

export default function SavingsGoalPage() {
  return <SavingsGoalClient />;
}
