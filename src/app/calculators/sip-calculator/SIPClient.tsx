'use client';
import { useState, useMemo } from 'react';
import NumberInput from '@/components/NumberInput';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CalculatorLayout from '@/components/CalculatorLayout';
import { calculateSIP, generateSIPGrowth } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import styles from '../calculator.module.css';

const COLORS = ['#16a34a', '#3b82f6'];

export default function SIPClient() {
  const [monthly, setMonthly] = useState(10000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(15);

  const result = useMemo(() => calculateSIP(monthly, returnRate, years), [monthly, returnRate, years]);
  const growthData = useMemo(() => generateSIPGrowth(monthly, returnRate, years), [monthly, returnRate, years]);

  const pieData = [
    { name: 'Invested', value: result.totalInvested },
    { name: 'Returns', value: result.estimatedReturns },
  ];

  const faqItems = [
    { question: 'What is SIP?', answer: 'SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly in mutual funds. It helps build wealth over time through the power of compounding and rupee cost averaging.' },
    { question: 'What returns can I expect from SIP?', answer: 'Returns depend on the type of mutual fund. Equity funds have historically given 12-15% annual returns over long periods, while debt funds typically give 6-8%.' },
    { question: 'Is SIP better than lumpsum?', answer: 'SIP is better for most investors as it averages out market volatility through rupee cost averaging. Lumpsum can give better returns if timed correctly, but timing the market is risky.' },
    { question: 'Can I modify my SIP amount?', answer: 'Yes, most mutual fund companies allow you to increase, decrease, pause, or stop your SIP at any time without penalty.' },
  ];

  return (
    <CalculatorLayout slug="sip-calculator" title="SIP Calculator" description="Plan your mutual fund SIP investments and estimate wealth growth with compound returns." icon="📈" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <h2 className={styles.panelTitle}>Investment Details</h2>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Monthly Investment</label><NumberInput className="input-value manual-input" value={monthly} onChange={setMonthly} /></div>
            <input type="range" className="range-slider" min={500} max={500000} step={500} value={monthly} onChange={e => setMonthly(+e.target.value)} id="sip-monthly-slider" />
            <div className={styles.rangeLabels}><span>₹500</span><span>₹5L</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Expected Return Rate (% p.a.)</label><NumberInput className="input-value manual-input" value={returnRate} onChange={setReturnRate} /></div>
            <input type="range" className="range-slider" min={1} max={30} step={0.5} value={returnRate} onChange={e => setReturnRate(+e.target.value)} id="sip-return-slider" />
            <div className={styles.rangeLabels}><span>1%</span><span>30%</span></div>
          </div>
          <div className={styles.inputGroup}>
            <div className="input-with-value"><label>Investment Duration</label><NumberInput className="input-value manual-input" value={years} onChange={setYears} /></div>
            <input type="range" className="range-slider" min={1} max={40} step={1} value={years} onChange={e => setYears(+e.target.value)} id="sip-years-slider" />
            <div className={styles.rangeLabels}><span>1 yr</span><span>40 yrs</span></div>
          </div>
        </div>
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>Maturity Value</span>
            <span className={styles.resultValue}>{formatCurrency(result.maturityValue)}</span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Total Invested</span><span className={styles.rcValue}>{formatCurrency(result.totalInvested)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Est. Returns</span><span className={styles.rcValueAccent}>{formatCurrency(result.estimatedReturns)}</span></div>
            <div className={styles.resultCard}><span className={styles.rcLabel}>Wealth Gained</span><span className={styles.rcValue}>{(result.maturityValue / result.totalInvested).toFixed(1)}x</span></div>
          </div>
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
        </div>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}><h3>Wealth Growth Projection</h3></div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={growthData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: 'Year', position: 'bottom', offset: -5 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`} />
            <Tooltip formatter={(val) => formatCurrency(Number(val))} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Area type="monotone" dataKey="invested" name="Invested" stroke="#16a34a" fillOpacity={1} fill="url(#colorInvested)" />
            <Area type="monotone" dataKey="value" name="Total Value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.tableSection}>
        <h3>Year-by-Year Projection</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th>Year</th><th>Invested</th><th>Returns</th><th>Total Value</th></tr></thead>
            <tbody>
              {growthData.map(row => (
                <tr key={row.year}><td>{row.year}</td><td>{formatCurrency(row.invested)}</td><td>{formatCurrency(row.returns)}</td><td>{formatCurrency(row.value)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorLayout>
  );
}
