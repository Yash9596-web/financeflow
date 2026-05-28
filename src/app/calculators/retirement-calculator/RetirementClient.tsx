'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateRetirement } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

export default function RetirementClient() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);

  const result = useMemo(() => calculateRetirement(currentAge, retirementAge, monthlyExpense, expectedReturn, inflationRate), [currentAge, retirementAge, monthlyExpense, expectedReturn, inflationRate]);

  const faqItems = [
    { question: 'How much money do I need to retire?', answer: 'It depends on your lifestyle, inflation, and expected returns. This calculator estimates the corpus needed based on your current expenses adjusted for inflation.' },
    { question: 'What is the 4% withdrawal rule?', answer: 'The 4% rule suggests you can withdraw 4% of your retirement corpus annually without running out of money for about 30 years.' },
    { question: 'Should I account for inflation in retirement planning?', answer: 'Absolutely. Inflation erodes purchasing power. ₹50,000 today may need ₹2.5 lakhs in 30 years at 6% inflation.' },
  ];

  return (
    <CalculatorLayout slug="retirement-calculator" title="Retirement Calculator" description="Plan your retirement corpus and monthly savings needed." icon="🏖️" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>Retirement Plan</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Current Age</label><NumberInput className="input-value manual-input" value={currentAge} onChange={setCurrentAge} /></div>
            <input type="range" className="range-slider" min={18} max={55} step={1} value={currentAge} onChange={e => setCurrentAge(+e.target.value)} />
            <div className={styles.rangeLabels}><span>18</span><span>55</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Retirement Age</label><NumberInput className="input-value manual-input" value={retirementAge} onChange={setRetirementAge} /></div>
            <input type="range" className="range-slider" min={45} max={70} step={1} value={retirementAge} onChange={e => setRetirementAge(+e.target.value)} />
            <div className={styles.rangeLabels}><span>45</span><span>70</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Monthly Expenses (Today)</label><NumberInput className="input-value manual-input" value={monthlyExpense} onChange={setMonthlyExpense} /></div>
            <input type="range" className="range-slider" min={10000} max={500000} step={5000} value={monthlyExpense} onChange={e => setMonthlyExpense(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹10K</span><span>₹5L</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Expected Return (% p.a.)</label><NumberInput className="input-value manual-input" value={expectedReturn} onChange={setExpectedReturn} /></div>
            <input type="range" className="range-slider" min={6} max={18} step={0.5} value={expectedReturn} onChange={e => setExpectedReturn(+e.target.value)} />
            <div className={styles.rangeLabels}><span>6%</span><span>18%</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Inflation Rate (% p.a.)</label><NumberInput className="input-value manual-input" value={inflationRate} onChange={setInflationRate} /></div>
            <input type="range" className="range-slider" min={3} max={10} step={0.5} value={inflationRate} onChange={e => setInflationRate(+e.target.value)} />
            <div className={styles.rangeLabels}><span>3%</span><span>10%</span></div>
          </div>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>Retirement Corpus Needed</span>
            <span className={styles.resultValue}>{formatCurrency(result.corpusNeeded)}</span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Monthly SIP Needed</span><span className={styles.rcValueAccent}>{formatCurrency(result.monthlySavingNeeded)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Years to Retire</span><span className={styles.rcValue}>{result.yearsToRetire} yrs</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Future Monthly Expense</span><span className={styles.rcValue}>{formatCurrency(result.futureMonthlyExpense)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Post-Retirement Years</span><span className={styles.rcValue}>{result.yearsAfterRetirement} yrs</span></div>
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(22, 163, 74, 0.08)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              💡 Start investing <strong>{formatCurrency(result.monthlySavingNeeded)}/month</strong> now to build a corpus of <strong>{formatCurrency(result.corpusNeeded)}</strong> by age {retirementAge}.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
