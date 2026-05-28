'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculatePPF } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';
const COLORS = ['#16a34a', '#3b82f6'];

export default function PPFPage() {
  const [yearly, setYearly] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);
  const result = useMemo(() => calculatePPF(yearly, rate, years), [yearly, rate, years]);
  const pieData = [{ name: 'Invested', value: result.totalInvested }, { name: 'Interest', value: result.totalInterest }];

  return (
    <CalculatorLayout slug="ppf-calculator" title="PPF Calculator" icon="🏛️" description="Calculate Public Provident Fund returns over 15+ years with yearly breakdown.">
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>PPF Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Yearly Investment</label><NumberInput className="input-value manual-input" value={yearly} onChange={setYearly} /></div>
            <input type="range" className="range-slider" min={500} max={150000} step={500} value={yearly} onChange={e => setYearly(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹500</span><span>₹1.5L (max)</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Interest Rate (% p.a.)</label><NumberInput className="input-value manual-input" value={rate} onChange={setRate} /></div>
            <input type="range" className="range-slider" min={5} max={10} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Duration</label><NumberInput className="input-value manual-input" value={years} onChange={setYears} /></div>
            <input type="range" className="range-slider" min={15} max={50} step={5} value={years} onChange={e => setYears(+e.target.value)} />
          </div>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}><span className={styles.resultLabel}>Maturity Amount</span><span className={styles.resultValue}>{formatCurrency(result.maturityAmount)}</span></div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Invested</span><span className={styles.rcValue}>{formatCurrency(result.totalInvested)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Interest</span><span className={styles.rcValueAccent}>{formatCurrency(result.totalInterest)}</span></div>
          </div>
          <ResponsiveContainer width="100%" height={220}><PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">{pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip formatter={(val) => formatCurrency(Number(val))} /><Legend wrapperStyle={{ paddingTop: '20px' }} /></PieChart></ResponsiveContainer>
        </div>
      </div>
    </CalculatorLayout>
  );
}
