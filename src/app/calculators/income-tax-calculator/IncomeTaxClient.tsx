'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateIncomeTax } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

export default function IncomeTaxClient() {
  const [income, setIncome] = useState(1200000);
  const [regime, setRegime] = useState<'new' | 'old'>('new');

  const result = useMemo(() => calculateIncomeTax(income, regime), [income, regime]);
  const compareNew = useMemo(() => calculateIncomeTax(income, 'new'), [income]);
  const compareOld = useMemo(() => calculateIncomeTax(income, 'old'), [income]);

  const chartData = [
    { name: 'New Regime', tax: Math.round(compareNew.totalTax), netIncome: Math.round(compareNew.netIncome) },
    { name: 'Old Regime', tax: Math.round(compareOld.totalTax), netIncome: Math.round(compareOld.netIncome) },
  ];

  const saving = Math.abs(compareNew.totalTax - compareOld.totalTax);
  const betterRegime = compareNew.totalTax <= compareOld.totalTax ? 'New' : 'Old';

  const faqItems = [
    { question: 'What is the difference between Old and New Tax Regime?', answer: 'The New Tax Regime (2024-25) offers lower tax rates but fewer deductions. The Old Regime allows deductions under 80C, 80D, HRA, etc. but has higher slab rates.' },
    { question: 'Which tax regime should I choose?', answer: 'If you have significant deductions (above ₹3-4 Lakhs), the Old Regime may save more. Otherwise, the New Regime with its lower rates is generally better.' },
    { question: 'Is there a standard deduction in the New Regime?', answer: 'Yes, from FY 2024-25, a standard deduction of ₹75,000 is available in the New Tax Regime for salaried individuals.' },
  ];

  return (
    <CalculatorLayout slug="income-tax-calculator" title="Income Tax Calculator" description="Calculate income tax under old and new regime for FY 2024-25." icon="📋" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>Tax Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Annual Income</label><NumberInput className="input-value manual-input" value={income} onChange={setIncome} /></div>
            <input type="range" className="range-slider" min={100000} max={10000000} step={50000} value={income} onChange={e => setIncome(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹1L</span><span>₹1Cr</span></div>
          </div>
          <div className={styles.inputGroup}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Tax Regime</label>
            <div className={styles.toggleGroup}>
              <button className={`${styles.toggleBtn} ${regime === 'new' ? styles.toggleActive : ''}`} onClick={() => setRegime('new')}>New Regime</button>
              <button className={`${styles.toggleBtn} ${regime === 'old' ? styles.toggleActive : ''}`} onClick={() => setRegime('old')}>Old Regime</button>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(22, 163, 74, 0.1)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              💡 <strong>{betterRegime} Regime saves you {formatCurrency(saving)}</strong> at this income level.
            </p>
          </div>
        </div>

        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>Total Tax ({regime === 'new' ? 'New' : 'Old'} Regime)</span>
            <span className={styles.resultValue}>{formatCurrency(result.totalTax)}</span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Tax Before Cess</span><span className={styles.rcValue}>{formatCurrency(result.taxBeforeCess)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Cess (4%)</span><span className={styles.rcValue}>{formatCurrency(result.cess)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Effective Rate</span><span className={styles.rcValueAccent}>{result.effectiveRate.toFixed(1)}%</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Net Income</span><span className={styles.rcValueAccent}>{formatCurrency(result.netIncome)}</span></div>
          </div>
          <h3 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Regime Comparison</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={(v) => `₹${(v/100000).toFixed(0)}L`} />
              <Tooltip formatter={(val) => formatCurrency(Number(val))} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="tax" name="Tax" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="netIncome" name="Net Income" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorLayout>
  );
}
