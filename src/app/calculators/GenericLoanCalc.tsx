'use client';
import { useState } from 'react';
import NumberInput from '@/components/NumberInput';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import { formatCurrency } from '@/utils/formatters';
import styles from './calculator.module.css';

const COLORS = ['#16a34a', '#3b82f6'];

export default function GenericLoanCalc({ slug, title, icon, description }: { slug: string; title: string; icon: string; description: string }) {
  const [principal, setPrincipal] = useState(slug === 'car-loan-calculator' ? 800000 : slug === 'education-loan-calculator' ? 1500000 : slug === 'credit-card-emi-calculator' ? 50000 : 2000000);
  const [rate, setRate] = useState(slug === 'car-loan-calculator' ? 9 : slug === 'education-loan-calculator' ? 10 : slug === 'credit-card-emi-calculator' ? 15 : 8.5);
  const [tenure, setTenure] = useState(slug === 'car-loan-calculator' ? 60 : slug === 'education-loan-calculator' ? 84 : slug === 'credit-card-emi-calculator' ? 12 : 240);

  const r = rate / 12 / 100;
  const emi = r === 0 ? principal / tenure : (principal * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - principal;
  const pieData = [{ name: 'Principal', value: principal }, { name: 'Interest', value: totalInterest }];

  return (
    <CalculatorLayout slug={slug} title={title} icon={icon} description={description}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>Loan Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Loan Amount</label><NumberInput className="input-value manual-input" value={principal} onChange={setPrincipal} /></div>
            <input type="range" className="range-slider" min={10000} max={50000000} step={10000} value={principal} onChange={e => setPrincipal(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹10K</span><span>₹5Cr</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Interest Rate (% p.a.)</label><NumberInput className="input-value manual-input" value={rate} onChange={setRate} /></div>
            <input type="range" className="range-slider" min={1} max={36} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1%</span><span>36%</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Tenure (months)</label><NumberInput className="input-value manual-input" value={tenure} onChange={setTenure} /></div>
            <input type="range" className="range-slider" min={3} max={360} step={3} value={tenure} onChange={e => setTenure(+e.target.value)} />
            <div className={styles.rangeLabels}><span>3 mo</span><span>30 yrs</span></div>
          </div>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}><span className={styles.resultLabel}>Monthly EMI</span><span className={styles.resultValue}>{formatCurrency(emi)}</span></div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Principal</span><span className={styles.rcValue}>{formatCurrency(principal)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Interest</span><span className={styles.rcValueAccent}>{formatCurrency(totalInterest)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Total</span><span className={styles.rcValue}>{formatCurrency(totalPayable)}</span></div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">{pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip formatter={(val) => formatCurrency(Number(val))} /><Legend wrapperStyle={{ paddingTop: '20px' }} /></PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorLayout>
  );
}
