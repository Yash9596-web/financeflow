'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import AffiliateWidget from '@/components/AffiliateWidget';
import { calculateEMI, generateAmortization } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

const COLORS = ['#16a34a', '#f59e0b', '#3b82f6'];

export default function EMIClient() {
  const [principal, setPrincipal] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(240);
  const [showYearly, setShowYearly] = useState(false);

  const result = useMemo(() => calculateEMI(principal, rate, tenure), [principal, rate, tenure]);
  const amortization = useMemo(() => generateAmortization(principal, rate, tenure), [principal, rate, tenure]);

  const pieData = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: result.totalInterest },
  ];

  const yearlyData = useMemo(() => {
    const years: { year: number; principal: number; interest: number }[] = [];
    for (let y = 0; y < Math.ceil(tenure / 12); y++) {
      const slice = amortization.slice(y * 12, (y + 1) * 12);
      years.push({
        year: y + 1,
        principal: slice.reduce((s, r) => s + r.principal, 0),
        interest: slice.reduce((s, r) => s + r.interest, 0),
      });
    }
    return years;
  }, [amortization, tenure]);

  const faqItems = [
    { question: 'What is EMI?', answer: 'EMI stands for Equated Monthly Installment. It is the fixed monthly payment made to a lender to repay a loan within a specified period. EMI consists of both principal and interest components.' },
    { question: 'How is EMI calculated?', answer: 'EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal amount, r is the monthly interest rate, and n is the number of monthly installments.' },
    { question: 'Does prepayment reduce EMI?', answer: 'Prepayment reduces the outstanding principal, which can either reduce the EMI amount or shorten the loan tenure, depending on the option you choose with your lender.' },
    { question: 'What factors affect EMI?', answer: 'Three main factors affect EMI: the loan amount (principal), the interest rate, and the loan tenure. A higher principal or interest rate increases EMI, while a longer tenure decreases it.' },
  ];

  const formulaSection = (
    <div className={styles.formulaBlock}>
      <h2>How EMI is Calculated</h2>
      <div className={styles.formulaCard}>
        <h3>EMI Formula</h3>
        <code className={styles.formula}>EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)</code>
        <div className={styles.formulaVars}>
          <p><strong>P</strong> = Principal Loan Amount</p>
          <p><strong>r</strong> = Monthly Interest Rate (Annual Rate / 12 / 100)</p>
          <p><strong>n</strong> = Number of Monthly Installments</p>
        </div>
      </div>
      <div className={styles.formulaExample}>
        <h3>Example</h3>
        <p>For a loan of ₹25,00,000 at 8.5% p.a. for 20 years:</p>
        <p>Monthly Rate = 8.5 / 12 / 100 = 0.00708</p>
        <p>EMI = ₹25,00,000 × 0.00708 × (1.00708)²⁴⁰ / ((1.00708)²⁴⁰ - 1)</p>
        <p><strong>EMI ≈ {formatCurrency(result.emi)}</strong></p>
      </div>
    </div>
  );

  return (
    <CalculatorLayout slug="emi-calculator" title="EMI Calculator" description="Calculate your Equated Monthly Installments for home, car, and personal loans instantly." icon="🏦" faqItems={faqItems} formulaSection={formulaSection}>
      <div className={styles.calcWrapper}>
        {/* INPUT PANEL */}
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>Loan Details</h2>

          <div className={styles.inputGroup}>
            <div className="input-with-value">
              <label>Loan Amount</label>
              <NumberInput className="input-value manual-input" value={principal} onChange={setPrincipal} />
            </div>
            <input type="range" className="range-slider" min={100000} max={50000000} step={50000} value={principal} onChange={e => setPrincipal(+e.target.value)} id="emi-principal-slider" />
            <div className={styles.rangeLabels}><span>₹1L</span><span>₹5Cr</span></div>
          </div>

          <div className={styles.inputGroup}>
            <div className="input-with-value">
              <label>Interest Rate (% p.a.)</label>
              <NumberInput className="input-value manual-input" value={rate} onChange={setRate} />
            </div>
            <input type="range" className="range-slider" min={1} max={30} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} id="emi-rate-slider" />
            <div className={styles.rangeLabels}><span>1%</span><span>30%</span></div>
          </div>

          <div className={styles.inputGroup}>
            <div className="input-with-value">
              <label>Loan Tenure</label>
              <NumberInput className="input-value manual-input" value={tenure} onChange={setTenure} />
            </div>
            <input type="range" className="range-slider" min={12} max={360} step={12} value={tenure} onChange={e => setTenure(+e.target.value)} id="emi-tenure-slider" />
            <div className={styles.rangeLabels}><span>1 yr</span><span>30 yrs</span></div>
          </div>
        </div>

        {/* RESULT PANEL */}
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>Monthly EMI</span>
            <span className={styles.resultValue}>{formatCurrency(result.emi)}</span>
          </div>

          <div className={styles.resultCards}>
            <div className={styles.resultCard}>
              <span className={styles.rcLabel}>Principal</span>
              <span className={styles.rcValue}>{formatCurrency(principal)}</span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.rcLabel}>Total Interest</span>
              <span className={styles.rcValueAccent}>{formatCurrency(result.totalInterest)}</span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.rcLabel}>Total Payable</span>
              <span className={styles.rcValue}>{formatCurrency(result.totalPayable)}</span>
            </div>
          </div>

          {/* PIE CHART */}
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(val) => formatCurrency(Number(val))} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <AffiliateWidget 
            type="loan"
            offers={[
              { id: '1', provider: 'HDFC Bank', title: 'Home Loan Transfer', description: 'Zero processing fee for balance transfer.', rate: '8.35', badge: 'Popular', link: '#' },
              { id: '2', provider: 'SBI', title: 'SBI Regular Home Loan', description: 'Concession for women borrowers.', rate: '8.40', link: '#' },
            ]}
          />
        </div>
      </div>

      {/* YEARLY BREAKDOWN CHART */}
      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h3>Repayment Schedule</h3>
          <div className={styles.toggleGroup}>
            <button className={`${styles.toggleBtn} ${!showYearly ? styles.toggleActive : ''}`} onClick={() => setShowYearly(false)}>Monthly</button>
            <button className={`${styles.toggleBtn} ${showYearly ? styles.toggleActive : ''}`} onClick={() => setShowYearly(true)}>Yearly</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearlyData.slice(0, 20)} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: 'Year', position: 'bottom', offset: -5 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`} />
            <Tooltip formatter={(val) => formatCurrency(Number(val))} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="principal" name="Principal" fill="#16a34a" radius={[4, 4, 0, 0]} />
            <Bar dataKey="interest" name="Interest" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AMORTIZATION TABLE */}
      <div className={styles.tableSection}>
        <h3>Amortization Schedule</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Month</th>
                <th>EMI</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortization.slice(0, showYearly ? amortization.length : 24).map(row => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>{formatCurrency(row.emi)}</td>
                  <td>{formatCurrency(row.principal)}</td>
                  <td>{formatCurrency(row.interest)}</td>
                  <td>{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!showYearly && amortization.length > 24 && (
          <button className="btn btn-ghost" onClick={() => setShowYearly(true)} style={{ marginTop: '1rem' }}>Show Full Schedule ({tenure} months)</button>
        )}
      </div>
    </CalculatorLayout>
  );
}
