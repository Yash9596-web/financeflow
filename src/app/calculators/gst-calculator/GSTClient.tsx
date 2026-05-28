'use client';
import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateGST } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

const GST_RATES = [3, 5, 12, 18, 28];

export default function GSTClient() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');

  const result = useMemo(() => calculateGST(amount, rate, type), [amount, rate, type]);

  const faqItems = [
    { question: 'What is GST?', answer: 'GST (Goods and Services Tax) is an indirect tax levied on the supply of goods and services in India. It replaced multiple taxes like VAT, service tax, and excise duty.' },
    { question: 'What are GST slabs in India?', answer: 'India has four main GST slabs: 5%, 12%, 18%, and 28%. Some essential items are taxed at 0% and special items at 3%.' },
    { question: 'What is CGST and SGST?', answer: 'CGST (Central GST) and SGST (State GST) are equal halves of GST charged on intra-state transactions. For inter-state transactions, IGST is charged.' },
  ];

  return (
    <CalculatorLayout slug="gst-calculator" title="GST Calculator" description="Calculate GST amount, CGST, SGST for any invoice instantly." icon="🧾" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>GST Details</h2>
          <div className={styles.gstToggle}>
            <button className={`${styles.gstToggleBtn} ${type === 'exclusive' ? styles.gstToggleActive : ''}`} onClick={() => setType('exclusive')}>Add GST</button>
            <button className={`${styles.gstToggleBtn} ${type === 'inclusive' ? styles.gstToggleActive : ''}`} onClick={() => setType('inclusive')}>Remove GST</button>
          </div>
          <div className={styles.inputGroup}>
            <label>{type === 'exclusive' ? 'Amount (before GST)' : 'Amount (including GST)'}</label>
            <input type="number" className="input-field" value={amount} onChange={e => setAmount(+e.target.value)} min={0} id="gst-amount" />
          </div>
          <div className={styles.inputGroup}>
            <label>GST Rate</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {GST_RATES.map(r => (
                <button key={r} className={`${styles.toggleBtn} ${rate === r ? styles.toggleActive : ''}`} onClick={() => setRate(r)} style={{ padding: '8px 16px' }}>{r}%</button>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>{type === 'exclusive' ? 'Total Amount (with GST)' : 'Original Amount (without GST)'}</span>
            <span className={styles.resultValue}>{type === 'exclusive' ? formatCurrency(result.totalAmount) : formatCurrency(result.originalAmount)}</span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>GST Amount</span><span className={styles.rcValueAccent}>{formatCurrency(result.gstAmount)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>CGST ({rate/2}%)</span><span className={styles.rcValue}>{formatCurrency(result.cgst)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>SGST ({rate/2}%)</span><span className={styles.rcValue}>{formatCurrency(result.sgst)}</span></div>
          </div>
        </div>
      </div>

      {/* Invoice Card */}
      <div className={styles.invoiceCard}>
        <div className={styles.invoiceHeader}><h3>🧾 Invoice Summary</h3></div>
        <div className={styles.invoiceRow}><span>Original Amount</span><span>{formatCurrency(result.originalAmount)}</span></div>
        <div className={styles.invoiceRow}><span>CGST @ {rate/2}%</span><span>+ {formatCurrency(result.cgst)}</span></div>
        <div className={styles.invoiceRow}><span>SGST @ {rate/2}%</span><span>+ {formatCurrency(result.sgst)}</span></div>
        <div className={styles.invoiceTotal}><span>Total Payable</span><span>{formatCurrency(result.totalAmount)}</span></div>
      </div>
    </CalculatorLayout>
  );
}
