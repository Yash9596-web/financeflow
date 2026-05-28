'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateCompoundInterest } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

const COLORS = ['#16a34a', '#3b82f6'];
const FREQ_OPTIONS = [{ label: 'Monthly', value: 12 }, { label: 'Quarterly', value: 4 }, { label: 'Half-Yearly', value: 2 }, { label: 'Yearly', value: 1 }];

export default function CompoundInterestClient() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const [freq, setFreq] = useState(12);

  const result = useMemo(() => calculateCompoundInterest(principal, rate, years, freq), [principal, rate, years, freq]);
  const pieData = [{ name: 'Principal', value: principal }, { name: 'Interest Earned', value: Math.round(result.interest) }];

  const faqItems = [
    { question: 'What is compound interest?', answer: 'Compound interest is interest calculated on the initial principal and also on the accumulated interest from previous periods. It makes your money grow faster over time.' },
    { question: 'How does compounding frequency affect returns?', answer: 'More frequent compounding (daily > monthly > quarterly > yearly) results in slightly higher returns because interest earns interest more often.' },
    { question: 'What is the Rule of 72?', answer: 'The Rule of 72 is a quick way to estimate how long it takes for an investment to double. Divide 72 by the annual interest rate to get approximate years.' },
  ];

  return (
    <CalculatorLayout slug="compound-interest-calculator" title="Compound Interest Calculator" description="Calculate compound interest with different compounding frequencies." icon="📊" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>Investment Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Principal Amount</label><NumberInput className="input-value manual-input" value={principal} onChange={setPrincipal} /></div>
            <input type="range" className="range-slider" min={10000} max={10000000} step={10000} value={principal} onChange={e => setPrincipal(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹10K</span><span>₹1Cr</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Interest Rate (% p.a.)</label><NumberInput className="input-value manual-input" value={rate} onChange={setRate} /></div>
            <input type="range" className="range-slider" min={1} max={30} step={0.5} value={rate} onChange={e => setRate(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1%</span><span>30%</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Time Period</label><NumberInput className="input-value manual-input" value={years} onChange={setYears} /></div>
            <input type="range" className="range-slider" min={1} max={30} step={1} value={years} onChange={e => setYears(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1 yr</span><span>30 yrs</span></div>
          </div>
          <div className={styles.inputGroup}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Compounding Frequency</label>
            <select className="select-field" value={freq} onChange={e => setFreq(+e.target.value)}>
              {FREQ_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>Total Value</span>
            <span className={styles.resultValue}>{formatCurrency(result.amount)}</span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Principal</span><span className={styles.rcValue}>{formatCurrency(principal)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Interest Earned</span><span className={styles.rcValueAccent}>{formatCurrency(result.interest)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Growth</span><span className={styles.rcValue}>{((result.amount / principal - 1) * 100).toFixed(1)}%</span></div>
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
