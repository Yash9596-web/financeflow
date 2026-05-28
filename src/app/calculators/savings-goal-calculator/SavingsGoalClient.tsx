'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateSavingsGoal } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

const COLORS = ['#3b82f6', '#16a34a'];

export default function SavingsGoalClient() {
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [years, setYears] = useState(5);
  const [annualReturn, setAnnualReturn] = useState(10);

  const result = useMemo(() => calculateSavingsGoal(goalAmount, years, annualReturn), [goalAmount, years, annualReturn]);
  const pieData = [{ name: 'Total Invested', value: Math.round(result.totalInvested) }, { name: 'Total Returns', value: Math.round(result.totalReturns) }];

  const faqItems = [
    { question: 'What is a Savings Goal Calculator?', answer: 'It calculates the exact amount you need to save and invest every month to reach a specific financial target within your chosen timeframe.' },
    { question: 'Does it account for compound interest?', answer: 'Yes, this calculator assumes your monthly investments generate compound interest at the specified annual return rate.' },
    { question: 'What is a realistic expected return?', answer: 'For short-term goals (1-3 years), FD/Debt funds offer 6-8%. For long-term goals (5+ years), equity mutual funds can offer 10-12% historically.' },
  ];

  return (
    <CalculatorLayout slug="savings-goal-calculator" title="Savings Goal Calculator" description="Find out how much to save monthly to reach your financial goal." icon="🎯" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>Goal Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Target Goal Amount</label><NumberInput className="input-value manual-input" value={goalAmount} onChange={setGoalAmount} /></div>
            <input type="range" className="range-slider" min={50000} max={50000000} step={50000} value={goalAmount} onChange={e => setGoalAmount(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹50K</span><span>₹5Cr</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Time Period to Reach Goal</label><NumberInput className="input-value manual-input" value={years} onChange={setYears} /></div>
            <input type="range" className="range-slider" min={1} max={30} step={1} value={years} onChange={e => setYears(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1 yr</span><span>30 yrs</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Expected Return (% p.a.)</label><NumberInput className="input-value manual-input" value={annualReturn} onChange={setAnnualReturn} /></div>
            <input type="range" className="range-slider" min={1} max={20} step={0.5} value={annualReturn} onChange={e => setAnnualReturn(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1%</span><span>20%</span></div>
          </div>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>Monthly Savings Needed</span>
            <span className={styles.resultValue}>{formatCurrency(result.monthlySaving)}</span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Total Invested</span><span className={styles.rcValue}>{formatCurrency(result.totalInvested)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Total Returns</span><span className={styles.rcValueAccent}>{formatCurrency(result.totalReturns)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Target Amount</span><span className={styles.rcValue}>{formatCurrency(goalAmount)}</span></div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(val) => formatCurrency(Number(val))} /><Legend wrapperStyle={{ paddingTop: '20px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorLayout>
  );
}
