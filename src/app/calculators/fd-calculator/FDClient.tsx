'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateFD } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

const COLORS = ['#16a34a', '#3b82f6'];
const FREQ_OPTIONS = [{ label: 'Monthly', value: 12 }, { label: 'Quarterly', value: 4 }, { label: 'Half-Yearly', value: 2 }, { label: 'Yearly', value: 1 }];

export default function FDClient() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [freq, setFreq] = useState(4);

  const result = useMemo(() => calculateFD(principal, rate, years, freq), [principal, rate, years, freq]);
  const pieData = [{ name: 'Principal', value: principal }, { name: 'Interest', value: result.interestEarned }];

  const faqItems = [
    { question: 'What is a Fixed Deposit?', answer: 'A Fixed Deposit (FD) is a savings instrument offered by banks where you deposit a lump sum for a fixed period at a predetermined interest rate. It provides guaranteed returns.' },
    { question: 'How does compounding frequency affect FD returns?', answer: 'More frequent compounding (monthly > quarterly > yearly) gives slightly higher returns as interest is calculated on previously earned interest more often.' },
    { question: 'Are FD returns taxable?', answer: 'Yes, interest earned on FD is taxable as per your income tax slab. If interest exceeds ₹40,000 in a year (₹50,000 for seniors), TDS is deducted.' },
  ];

  return (
    <CalculatorLayout slug="fd-calculator" title="FD Calculator" description="Calculate fixed deposit maturity amount and interest earned with different compounding frequencies." icon="🏧" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>FD Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Deposit Amount</label><NumberInput className="input-value manual-input" value={principal} onChange={setPrincipal} /></div>
            <input type="range" className="range-slider" min={10000} max={10000000} step={10000} value={principal} onChange={e => setPrincipal(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹10K</span><span>₹1Cr</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Interest Rate (% p.a.)</label><NumberInput className="input-value manual-input" value={rate} onChange={setRate} /></div>
            <input type="range" className="range-slider" min={1} max={15} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1%</span><span>15%</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Tenure</label><NumberInput className="input-value manual-input" value={years} onChange={setYears} /></div>
            <input type="range" className="range-slider" min={1} max={20} step={1} value={years} onChange={e => setYears(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1 yr</span><span>20 yrs</span></div>
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
            <span className={styles.resultLabel}>Maturity Amount</span>
            <span className={styles.resultValue}>{formatCurrency(result.maturityAmount)}</span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Deposit</span><span className={styles.rcValue}>{formatCurrency(principal)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Interest</span><span className={styles.rcValueAccent}>{formatCurrency(result.interestEarned)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Growth</span><span className={styles.rcValue}>{((result.maturityAmount / principal - 1) * 100).toFixed(1)}%</span></div>
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
