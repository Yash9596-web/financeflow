'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateLoanEligibility } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

export default function LoanEligibilityClient() {
  const [income, setIncome] = useState(80000);
  const [existingEMI, setExistingEMI] = useState(5000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(240);

  const result = useMemo(() => calculateLoanEligibility(income, existingEMI, rate, tenure), [income, existingEMI, rate, tenure]);

  const faqItems = [
    { question: 'How is loan eligibility calculated?', answer: 'Banks typically allow a maximum EMI of 50% of your monthly income. After deducting existing EMIs, the remaining capacity determines your eligible loan amount.' },
    { question: 'What factors affect loan eligibility?', answer: 'Monthly income, existing EMIs/loans, credit score, age, employment type, and the interest rate and tenure you choose.' },
    { question: 'Can I increase my loan eligibility?', answer: 'Yes — by increasing income, reducing existing debts, adding a co-applicant, choosing a longer tenure, or improving your credit score.' },
  ];

  return (
    <CalculatorLayout slug="loan-eligibility-calculator" title="Loan Eligibility Calculator" description="Check how much loan you can get based on your income." icon="✅" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>Your Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Monthly Income</label><NumberInput className="input-value manual-input" value={income} onChange={setIncome} /></div>
            <input type="range" className="range-slider" min={10000} max={500000} step={5000} value={income} onChange={e => setIncome(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹10K</span><span>₹5L</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Existing EMIs</label><NumberInput className="input-value manual-input" value={existingEMI} onChange={setExistingEMI} /></div>
            <input type="range" className="range-slider" min={0} max={200000} step={1000} value={existingEMI} onChange={e => setExistingEMI(+e.target.value)} />
            <div className={styles.rangeLabels}><span>₹0</span><span>₹2L</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Interest Rate (% p.a.)</label><NumberInput className="input-value manual-input" value={rate} onChange={setRate} /></div>
            <input type="range" className="range-slider" min={6} max={18} step={0.25} value={rate} onChange={e => setRate(+e.target.value)} />
            <div className={styles.rangeLabels}><span>6%</span><span>18%</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Loan Tenure</label><NumberInput className="input-value manual-input" value={tenure} onChange={setTenure} /></div>
            <input type="range" className="range-slider" min={12} max={360} step={12} value={tenure} onChange={e => setTenure(+e.target.value)} />
            <div className={styles.rangeLabels}><span>1 yr</span><span>30 yrs</span></div>
          </div>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>Eligible Loan Amount</span>
            <span className={styles.resultValue}>{formatCurrency(Math.max(0, result.eligibleAmount))}</span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Max EMI Capacity</span><span className={styles.rcValueAccent}>{formatCurrency(Math.max(0, result.maxEMI))}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Monthly Income</span><span className={styles.rcValue}>{formatCurrency(income)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Existing EMIs</span><span className={styles.rcValue}>{formatCurrency(existingEMI)}</span></div>
          </div>
          {result.maxEMI <= 0 && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #ef4444' }}>
              <p style={{ fontSize: '0.85rem', color: '#ef4444', margin: 0 }}>⚠️ Your existing EMIs exceed 50% of your income. Consider reducing existing debts first.</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}