'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateRD } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';
const COLORS = ['#16a34a', '#3b82f6'];


export default function RDPage() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const result = useMemo(() => calculateRD(monthly, rate, years), [monthly, rate, years]);
  const pieData = [{ name: 'Deposited', value: result.totalDeposited }, { name: 'Interest', value: result.interestEarned }];

  return (
    <CalculatorLayout slug="rd-calculator" title="RD Calculator" icon="💰" description="Calculate recurring deposit maturity amount and interest earned.">
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>RD Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Monthly Deposit</label><NumberInput className="input-value manual-input" value={monthly} onChange={setMonthly} /></div>
            <input type="range" className="range-slider" min={500} max={100000} step={500} value={monthly} onChange={e => setMonthly(+e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Interest Rate (% p.a.)</label><NumberInput className="input-value manual-input" value={rate} onChange={setRate} /></div>
            <input type="range" className="range-slider" min={1} max={12} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Tenure</label><NumberInput className="input-value manual-input" value={years} onChange={setYears} /></div>
            <input type="range" className="range-slider" min={1} max={10} step={1} value={years} onChange={e => setYears(+e.target.value)} />
          </div>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}><span className={styles.resultLabel}>Maturity Amount</span><span className={styles.resultValue}>{formatCurrency(result.maturityAmount)}</span></div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Deposited</span><span className={styles.rcValue}>{formatCurrency(result.totalDeposited)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Interest</span><span className={styles.rcValueAccent}>{formatCurrency(result.interestEarned)}</span></div>
          </div>
          <ResponsiveContainer width="100%" height={220}><PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">{pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip formatter={(val) => formatCurrency(Number(val))} /><Legend wrapperStyle={{ paddingTop: '20px' }} /></PieChart></ResponsiveContainer>
        </div>
      </div>
    </CalculatorLayout>
  );
}
