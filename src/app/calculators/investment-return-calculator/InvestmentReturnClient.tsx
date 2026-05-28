'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateCompoundInterest } from '@/utils/calculations'; // Using CI logic for lumpsum
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

const COLORS = ['#3b82f6', '#16a34a'];

export default function InvestmentReturnClient() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => calculateCompoundInterest(principal, rate, years, 1), [principal, rate, years]); // Annual compounding for lumpsum
  const pieData = [{ name: 'Investment', value: principal }, { name: 'Estimated Returns', value: Math.round(result.interest) }];

  const faqItems = [
    { question: 'What is a Lumpsum Investment Return Calculator?', answer: 'It calculates the future value of a one-time (lumpsum) investment over a specific period at a given expected rate of return.' },
    { question: 'How is this different from a SIP calculator?', answer: 'A SIP calculator computes returns for regular monthly investments. This calculator assumes you invest the entire amount upfront on day one.' },
    { question: 'Does it account for taxes?', answer: 'No, this calculator shows gross returns before taxes. Actual in-hand amount will depend on applicable capital gains tax.' },
  ];

  return (
    <CalculatorLayout slug="investment-return-calculator" title="Investment Return Calculator" description="Calculate returns on your lumpsum investment." icon="💹" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>Investment Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Total Investment</label><NumberInput className="input-value manual-input" value={principal} onChange={setPrincipal} /></div>
            <input type="range" className="range-slider" min={10000} max={10000000} step={10000} value={principal} onChange={e => setPrincipal(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹10K</span><span>₹1Cr</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Expected Return (% p.a.)</label><NumberInput className="input-value manual-input" value={rate} onChange={setRate} /></div>
            <input type="range" className="range-slider" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1%</span><span>30%</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Time Period</label><NumberInput className="input-value manual-input" value={years} onChange={setYears} /></div>
            <input type="range" className="range-slider" min={1} max={40} step={1} value={years} onChange={e => setYears(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1 yr</span><span>40 yrs</span></div>
          </div>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>Total Value</span>
            <span className={styles.resultValue}>{formatCurrency(result.amount)}</span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Invested Amount</span><span className={styles.rcValue}>{formatCurrency(principal)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Estimated Returns</span><span className={styles.rcValueAccent}>{formatCurrency(result.interest)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Absolute Return</span><span className={styles.rcValue}>{((result.amount / principal - 1) * 100).toFixed(1)}%</span></div>
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
