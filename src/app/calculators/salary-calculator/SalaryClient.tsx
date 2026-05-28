'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateSalary } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

const COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];

export default function SalaryClient() {
  const [ctc, setCtc] = useState(1200000);

  const result = useMemo(() => calculateSalary(ctc), [ctc]);
  const pieData = [
    { name: 'Basic', value: Math.round(result.basic) },
    { name: 'HRA', value: Math.round(result.hra) },
    { name: 'DA', value: Math.round(result.da) },
    { name: 'Special Allowance', value: Math.round(result.special) },
    { name: 'PF (Employer)', value: Math.round(result.pf) },
  ];

  const faqItems = [
    { question: 'What is CTC?', answer: 'CTC (Cost to Company) is the total amount a company spends on an employee per year, including salary, PF contributions, insurance, and other benefits.' },
    { question: 'How is take-home salary calculated?', answer: 'Take-home = CTC - PF contribution - Professional Tax - Income Tax. The exact amount depends on your tax regime and deductions.' },
    { question: 'What is the difference between gross and net salary?', answer: 'Gross salary is your total earnings before deductions. Net salary (take-home) is what you receive after all deductions like PF, tax, and professional tax.' },
  ];

  return (
    <CalculatorLayout slug="salary-calculator" title="Salary Calculator" description="Calculate in-hand salary from CTC with full breakdown." icon="💼" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>Salary Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Annual CTC</label><NumberInput className="input-value manual-input" value={ctc} onChange={setCtc} /></div>
            <input type="range" className="range-slider" min={200000} max={10000000} step={50000} value={ctc} onChange={e => setCtc(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹2L</span><span>₹1Cr</span></div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Monthly Breakdown</h3>
            <table className={styles.amortTable}>
              <thead><tr><th>Component</th><th>Monthly</th><th>Annual</th></tr></thead>
              <tbody>
                <tr><td>Basic Pay</td><td>{formatCurrency(result.basic / 12)}</td><td>{formatCurrency(result.basic)}</td></tr>
                <tr><td>HRA</td><td>{formatCurrency(result.hra / 12)}</td><td>{formatCurrency(result.hra)}</td></tr>
                <tr><td>DA</td><td>{formatCurrency(result.da / 12)}</td><td>{formatCurrency(result.da)}</td></tr>
                <tr><td>Special Allowance</td><td>{formatCurrency(result.special / 12)}</td><td>{formatCurrency(result.special)}</td></tr>
                <tr style={{ color: '#ef4444' }}><td>PF Deduction</td><td>-{formatCurrency(result.pf / 12)}</td><td>-{formatCurrency(result.pf)}</td></tr>
                <tr style={{ color: '#ef4444' }}><td>Professional Tax</td><td>-{formatCurrency(result.professionalTax / 12)}</td><td>-{formatCurrency(result.professionalTax)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>Monthly Take-Home</span>
            <span className={styles.resultValue}>{formatCurrency(result.netMonthly)}</span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Gross Salary</span><span className={styles.rcValue}>{formatCurrency(result.grossSalary)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Total Deductions</span><span className={styles.rcValue}>{formatCurrency(result.totalDeductions)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Net Annual</span><span className={styles.rcValueAccent}>{formatCurrency(result.netAnnual)}</span></div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
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
