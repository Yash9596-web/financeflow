'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateInflation } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

export default function InflationClient() {
  const [currentCost, setCurrentCost] = useState(100000);
  const [inflationRate, setInflationRate] = useState(6);
  const [years, setYears] = useState(10);

  const result = useMemo(() => calculateInflation(currentCost, inflationRate, years), [currentCost, inflationRate, years]);
  
  const chartData = [
    { name: 'Current Cost', value: currentCost },
    { name: 'Future Cost', value: Math.round(result.futureCost) },
  ];

  const faqItems = [
    { question: 'What is inflation?', answer: 'Inflation is the rate at which the general level of prices for goods and services rises, eroding purchasing power. Simply put, it means your money buys less over time.' },
    { question: 'Why is calculating inflation important?', answer: 'It helps you understand how much more you will need to pay for the same lifestyle in the future, which is crucial for retirement planning and goal setting.' },
    { question: 'What is a typical inflation rate?', answer: 'In India, the retail inflation rate typically ranges between 4% to 7% historically, though specific costs like healthcare or education often inflate faster.' },
  ];

  return (
    <CalculatorLayout slug="inflation-calculator" title="Inflation Calculator" description="See how inflation erodes purchasing power over time." icon="📉" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>Expense Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Current Cost of Item/Expense</label><NumberInput className="input-value manual-input" value={currentCost} onChange={setCurrentCost} /></div>
            <input type="range" className="range-slider" min={1000} max={10000000} step={1000} value={currentCost} onChange={e => setCurrentCost(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹1K</span><span>₹1Cr</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Expected Inflation Rate (% p.a.)</label><NumberInput className="input-value manual-input" value={inflationRate} onChange={setInflationRate} /></div>
            <input type="range" className="range-slider" min={1} max={15} step={0.5} value={inflationRate} onChange={e => setInflationRate(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1%</span><span>15%</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Time Period</label><NumberInput className="input-value manual-input" value={years} onChange={setYears} /></div>
            <input type="range" className="range-slider" min={1} max={50} step={1} value={years} onChange={e => setYears(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1 yr</span><span>50 yrs</span></div>
          </div>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>Future Cost</span>
            <span className={styles.resultValue}>{formatCurrency(result.futureCost)}</span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Current Cost</span><span className={styles.rcValue}>{formatCurrency(currentCost)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Cost Increase</span><span className={styles.rcValueAccent}>{formatCurrency(result.costIncrease)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Purchasing Power Loss</span><span className={styles.rcValue}>{result.purchasingPowerLoss.toFixed(1)}%</span></div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={(val) => formatCurrency(Number(val))} />
              <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorLayout>
  );
}
