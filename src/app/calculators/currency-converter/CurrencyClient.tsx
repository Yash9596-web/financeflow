'use client';
import { useState, useEffect, useCallback } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import styles from '../calculator.module.css';

// Fallback rates (used only if API fails)
const FALLBACK_RATES: Record<string, number> = {
  USD: 1, INR: 83.25, EUR: 0.92, GBP: 0.79, AUD: 1.53,
  CAD: 1.36, JPY: 151.40, CNY: 7.23, AED: 3.67, SGD: 1.34,
  CHF: 0.88, SAR: 3.75, KWD: 0.31, BHD: 0.376, OMR: 0.385,
  QAR: 3.64, MYR: 4.72, THB: 35.8, KRW: 1340, BDT: 110,
  PKR: 278, LKR: 312, NPR: 133, PHP: 56.2, IDR: 15700,
  NZD: 1.63, ZAR: 18.4, BRL: 4.95, MXN: 17.1, SEK: 10.5,
  NOK: 10.6, DKK: 6.87, HKD: 7.82, TWD: 31.5, RUB: 92,
};

const CURRENCY_INFO: Record<string, { name: string; flag: string; symbol: string }> = {
  USD: { name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  INR: { name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
  EUR: { name: 'Euro', flag: '🇪🇺', symbol: '€' },
  GBP: { name: 'British Pound', flag: '🇬🇧', symbol: '£' },
  AUD: { name: 'Australian Dollar', flag: '🇦🇺', symbol: 'A$' },
  CAD: { name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
  JPY: { name: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
  CNY: { name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
  AED: { name: 'UAE Dirham', flag: '🇦🇪', symbol: 'د.إ' },
  SGD: { name: 'Singapore Dollar', flag: '🇸🇬', symbol: 'S$' },
  CHF: { name: 'Swiss Franc', flag: '🇨🇭', symbol: 'CHF' },
  SAR: { name: 'Saudi Riyal', flag: '🇸🇦', symbol: '﷼' },
  KWD: { name: 'Kuwaiti Dinar', flag: '🇰🇼', symbol: 'د.ك' },
  BHD: { name: 'Bahraini Dinar', flag: '🇧🇭', symbol: '.د.ب' },
  OMR: { name: 'Omani Rial', flag: '🇴🇲', symbol: '﷼' },
  QAR: { name: 'Qatari Riyal', flag: '🇶🇦', symbol: '﷼' },
  MYR: { name: 'Malaysian Ringgit', flag: '🇲🇾', symbol: 'RM' },
  THB: { name: 'Thai Baht', flag: '🇹🇭', symbol: '฿' },
  KRW: { name: 'South Korean Won', flag: '🇰🇷', symbol: '₩' },
  BDT: { name: 'Bangladeshi Taka', flag: '🇧🇩', symbol: '৳' },
  PKR: { name: 'Pakistani Rupee', flag: '🇵🇰', symbol: '₨' },
  LKR: { name: 'Sri Lankan Rupee', flag: '🇱🇰', symbol: 'Rs' },
  NPR: { name: 'Nepalese Rupee', flag: '🇳🇵', symbol: 'Rs' },
  PHP: { name: 'Philippine Peso', flag: '🇵🇭', symbol: '₱' },
  IDR: { name: 'Indonesian Rupiah', flag: '🇮🇩', symbol: 'Rp' },
  NZD: { name: 'New Zealand Dollar', flag: '🇳🇿', symbol: 'NZ$' },
  ZAR: { name: 'South African Rand', flag: '🇿🇦', symbol: 'R' },
  BRL: { name: 'Brazilian Real', flag: '🇧🇷', symbol: 'R$' },
  MXN: { name: 'Mexican Peso', flag: '🇲🇽', symbol: 'Mex$' },
  SEK: { name: 'Swedish Krona', flag: '🇸🇪', symbol: 'kr' },
  NOK: { name: 'Norwegian Krone', flag: '🇳🇴', symbol: 'kr' },
  DKK: { name: 'Danish Krone', flag: '🇩🇰', symbol: 'kr' },
  HKD: { name: 'Hong Kong Dollar', flag: '🇭🇰', symbol: 'HK$' },
  TWD: { name: 'Taiwan Dollar', flag: '🇹🇼', symbol: 'NT$' },
  RUB: { name: 'Russian Ruble', flag: '🇷🇺', symbol: '₽' },
};

const CURRENCIES = Object.keys(CURRENCY_INFO);

type RateStatus = 'loading' | 'live' | 'fallback';

export default function CurrencyClient() {
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [rateStatus, setRateStatus] = useState<RateStatus>('loading');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchRates = useCallback(async () => {
    setRateStatus('loading');
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      // Merge: keep only currencies we support
      const liveRates: Record<string, number> = {};
      for (const code of CURRENCIES) {
        liveRates[code] = data.rates[code] ?? FALLBACK_RATES[code];
      }
      setRates(liveRates);
      setRateStatus('live');
      setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch {
      setRates(FALLBACK_RATES);
      setRateStatus('fallback');
      setLastUpdated('Using offline rates');
    }
  }, []);

  // Fetch on mount + auto-refresh every 60 seconds
  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60_000);
    return () => clearInterval(interval);
  }, [fetchRates]);

  // Convert via USD base
  const usdAmount = amount / rates[fromCurrency];
  const convertedAmount = usdAmount * rates[toCurrency];
  const exchangeRate = rates[toCurrency] / rates[fromCurrency];

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const faqItems = [
    { question: 'How accurate are these exchange rates?', answer: 'We fetch live exchange rates from a reliable API that updates in real-time. Rates are automatically refreshed every 60 seconds for accuracy.' },
    { question: 'Do banks charge a fee for currency conversion?', answer: 'Yes, banks and forex providers usually charge a markup over the mid-market exchange rate, plus potential fixed transaction fees.' },
    { question: 'What currencies are supported?', answer: 'We support 35+ major world currencies including USD, EUR, GBP, INR, JPY, AUD, CAD, AED, SGD, CHF, and many more.' },
    { question: 'Are the rates updated in real-time?', answer: 'Yes, rates are fetched live from market data and auto-refresh every 60 seconds. A green indicator shows when rates are live.' },
  ];

  const statusColor = rateStatus === 'live' ? '#16a34a' : rateStatus === 'loading' ? '#f59e0b' : '#ef4444';
  const statusLabel = rateStatus === 'live' ? 'Live' : rateStatus === 'loading' ? 'Updating...' : 'Offline';

  return (
    <CalculatorLayout slug="currency-converter" title="Currency Converter" description="Convert between major world currencies with live exchange rates." icon="💱" faqItems={faqItems}>
      <div className={styles.calcWrapper}>
        <div className={styles.inputPanel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h2 className={styles.panelTitle} style={{ margin: 0 }}>Conversion Details</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: statusColor,
                boxShadow: rateStatus === 'live' ? '0 0 8px rgba(22,163,106,0.6)' : 'none',
                animation: rateStatus === 'loading' ? 'pulse 1.5s infinite' : 'none',
                display: 'inline-block',
              }} />
              <span style={{ fontSize: '0.75rem', color: statusColor, fontWeight: 600 }}>{statusLabel}</span>
            </div>
          </div>

          {lastUpdated && (
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>
              Last updated: {lastUpdated}
              {rateStatus === 'live' && <span style={{ marginLeft: '8px', cursor: 'pointer', opacity: 0.7 }} onClick={fetchRates} title="Refresh rates">🔄</span>}
            </p>
          )}

          <div className={styles.inputGroup}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Amount</label>
            <input
              type="number"
              className="select-field"
              value={amount}
              onChange={e => setAmount(+e.target.value)}
              min={0}
              style={{ fontSize: '1.1rem', fontWeight: 600 }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className={styles.inputGroup} style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>From</label>
              <select className="select-field" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
                {CURRENCIES.map(c => (
                  <option key={c} value={c}>{CURRENCY_INFO[c].flag} {c} — {CURRENCY_INFO[c].name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              style={{
                marginTop: '1rem', background: 'var(--primary)', color: 'white',
                border: 'none', borderRadius: '50%', width: '44px', height: '44px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(180deg)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,130,246,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(0deg)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(59,130,246,0.3)'; }}
              title="Swap currencies"
            >
              ⇄
            </button>

            <div className={styles.inputGroup} style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>To</label>
              <select className="select-field" value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                {CURRENCIES.map(c => (
                  <option key={c} value={c}>{CURRENCY_INFO[c].flag} {c} — {CURRENCY_INFO[c].name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Exchange Rate Info Box */}
          <div style={{
            marginTop: '1.5rem', padding: '1rem',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(16,163,127,0.08))',
            borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary)',
          }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              {CURRENCY_INFO[fromCurrency]?.flag} 1 {fromCurrency} = <strong style={{ color: 'var(--primary)', fontSize: '1rem' }}>{exchangeRate.toFixed(4)}</strong> {toCurrency} {CURRENCY_INFO[toCurrency]?.flag}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              {CURRENCY_INFO[toCurrency]?.flag} 1 {toCurrency} = <strong style={{ color: 'var(--primary)', fontSize: '1rem' }}>{(1 / exchangeRate).toFixed(4)}</strong> {fromCurrency} {CURRENCY_INFO[fromCurrency]?.flag}
            </p>
          </div>
        </div>

        {/* Result Panel */}
        <div className={styles.resultPanel}>
          <div className={styles.resultHighlight}>
            <span className={styles.resultLabel}>Converted Amount</span>
            <span className={styles.resultValue}>
              {CURRENCY_INFO[toCurrency]?.symbol}{' '}
              {convertedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {CURRENCY_INFO[toCurrency]?.flag} {CURRENCY_INFO[toCurrency]?.name}
            </span>
          </div>
          <div className={styles.resultCards}>
            <div className={styles.resultCard}>
              <span className={styles.rcLabel}>Original Amount</span>
              <span className={styles.rcValue}>
                {CURRENCY_INFO[fromCurrency]?.symbol} {amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.rcLabel}>Exchange Rate</span>
              <span className={styles.rcValueAccent}>{exchangeRate.toFixed(4)}</span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.rcLabel}>Rate Source</span>
              <span className={styles.rcValue} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: statusColor, display: 'inline-block',
                }} />
                {rateStatus === 'live' ? 'Live Market' : rateStatus === 'loading' ? 'Updating' : 'Offline Cache'}
              </span>
            </div>
          </div>

          {/* Popular Conversions */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
              Popular Conversions from {CURRENCY_INFO[fromCurrency]?.flag} {fromCurrency}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {['INR', 'USD', 'EUR', 'GBP', 'AED', 'JPY'].filter(c => c !== fromCurrency).slice(0, 4).map(code => {
                const rate = rates[code] / rates[fromCurrency];
                return (
                  <div key={code} style={{
                    padding: '0.6rem 0.8rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                    onClick={() => setToCurrency(code)}
                  >
                    <span style={{ fontWeight: 600 }}>{CURRENCY_INFO[code]?.flag} {code}</span>
                    <span style={{ float: 'right', color: 'var(--primary)', fontWeight: 600 }}>{(amount * rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </CalculatorLayout>
  );
}
