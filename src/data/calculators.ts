export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  icon: string;
  category: string;
  keywords: string[];
  featured: boolean;
}

export const calculatorCategories = ['Loans', 'Investments', 'Taxes', 'Savings', 'Retirement', 'Salary'] as const;

export const calculators: CalculatorMeta[] = [
  { slug: 'emi-calculator', title: 'EMI Calculator', shortTitle: 'EMI', description: 'Calculate your Equated Monthly Installments for any loan.', metaDescription: 'Free EMI Calculator — Calculate monthly EMI for home, car, and personal loans instantly. View amortization schedule and interest breakdown.', icon: '🏦', category: 'Loans', keywords: ['emi calculator', 'loan emi', 'home loan emi'], featured: true },
  { slug: 'sip-calculator', title: 'SIP Calculator', shortTitle: 'SIP', description: 'Plan your mutual fund SIP investments and estimate returns.', metaDescription: 'Free SIP Calculator — Estimate your mutual fund returns with systematic investment plan calculator. View wealth growth projections.', icon: '📈', category: 'Investments', keywords: ['sip calculator', 'mutual fund calculator', 'sip returns'], featured: true },
  { slug: 'fd-calculator', title: 'FD Calculator', shortTitle: 'FD', description: 'Calculate fixed deposit maturity amount and interest earned.', metaDescription: 'Free FD Calculator — Calculate fixed deposit maturity amount and interest earned with different compounding frequencies.', icon: '🏧', category: 'Savings', keywords: ['fd calculator', 'fixed deposit calculator'], featured: true },
  { slug: 'rd-calculator', title: 'RD Calculator', shortTitle: 'RD', description: 'Calculate recurring deposit maturity amount.', metaDescription: 'Free RD Calculator — Calculate recurring deposit returns and maturity amount. Plan your monthly savings.', icon: '💰', category: 'Savings', keywords: ['rd calculator', 'recurring deposit calculator'], featured: false },
  { slug: 'ppf-calculator', title: 'PPF Calculator', shortTitle: 'PPF', description: 'Calculate Public Provident Fund returns over 15 years.', metaDescription: 'Free PPF Calculator — Calculate PPF maturity amount, interest earned, and yearly growth projection.', icon: '🏛️', category: 'Savings', keywords: ['ppf calculator', 'public provident fund'], featured: false },
  { slug: 'gst-calculator', title: 'GST Calculator', shortTitle: 'GST', description: 'Calculate GST amount, CGST, SGST for any invoice.', metaDescription: 'Free GST Calculator — Add or remove GST instantly. Calculate CGST, SGST breakdown for any amount.', icon: '🧾', category: 'Taxes', keywords: ['gst calculator', 'gst calculation'], featured: true },
  { slug: 'income-tax-calculator', title: 'Income Tax Calculator', shortTitle: 'Income Tax', description: 'Calculate income tax under old and new regime.', metaDescription: 'Free Income Tax Calculator India — Calculate tax liability under old and new regime for FY 2024-25.', icon: '📋', category: 'Taxes', keywords: ['income tax calculator', 'tax calculator india'], featured: true },
  { slug: 'salary-calculator', title: 'Salary Calculator', shortTitle: 'Salary', description: 'Calculate in-hand salary from CTC with full breakdown.', metaDescription: 'Free Salary Calculator — Calculate net salary, take-home pay from CTC. View PF, tax deductions breakdown.', icon: '💼', category: 'Salary', keywords: ['salary calculator', 'ctc to in-hand'], featured: true },
  { slug: 'compound-interest-calculator', title: 'Compound Interest Calculator', shortTitle: 'Compound Interest', description: 'Calculate compound interest with different frequencies.', metaDescription: 'Free Compound Interest Calculator — Calculate compound interest with monthly, quarterly, or yearly compounding.', icon: '📊', category: 'Investments', keywords: ['compound interest calculator'], featured: false },
  { slug: 'retirement-calculator', title: 'Retirement Calculator', shortTitle: 'Retirement', description: 'Plan your retirement corpus and monthly savings needed.', metaDescription: 'Free Retirement Calculator — Calculate retirement corpus needed and monthly savings required for a secure future.', icon: '🏖️', category: 'Retirement', keywords: ['retirement calculator', 'retirement planning'], featured: true },
  { slug: 'home-loan-calculator', title: 'Home Loan Calculator', shortTitle: 'Home Loan', description: 'Calculate home loan EMI with amortization schedule.', metaDescription: 'Free Home Loan EMI Calculator — Calculate monthly payments, total interest for housing loans.', icon: '🏠', category: 'Loans', keywords: ['home loan calculator', 'housing loan emi'], featured: false },
  { slug: 'car-loan-calculator', title: 'Car Loan Calculator', shortTitle: 'Car Loan', description: 'Calculate car loan EMI and total repayment amount.', metaDescription: 'Free Car Loan EMI Calculator — Calculate monthly car loan payments and interest cost.', icon: '🚗', category: 'Loans', keywords: ['car loan calculator', 'car loan emi'], featured: false },
  { slug: 'personal-loan-calculator', title: 'Personal Loan Calculator', shortTitle: 'Personal Loan', description: 'Calculate personal loan EMI and interest cost.', metaDescription: 'Free Personal Loan EMI Calculator — Estimate monthly payments for personal loans.', icon: '👤', category: 'Loans', keywords: ['personal loan calculator', 'personal loan emi'], featured: false },
  { slug: 'loan-eligibility-calculator', title: 'Loan Eligibility Calculator', shortTitle: 'Loan Eligibility', description: 'Check how much loan you can get based on your income.', metaDescription: 'Free Loan Eligibility Calculator — Check maximum loan amount based on your income and existing obligations.', icon: '✅', category: 'Loans', keywords: ['loan eligibility calculator'], featured: false },
  { slug: 'inflation-calculator', title: 'Inflation Calculator', shortTitle: 'Inflation', description: 'Calculate the impact of inflation on your money.', metaDescription: 'Free Inflation Calculator — See how inflation erodes purchasing power over time.', icon: '📉', category: 'Investments', keywords: ['inflation calculator', 'inflation impact'], featured: false },
  { slug: 'savings-goal-calculator', title: 'Savings Goal Calculator', shortTitle: 'Savings Goal', description: 'Calculate monthly savings needed to reach your goal.', metaDescription: 'Free Savings Goal Calculator — Find out how much to save monthly to reach your financial goal.', icon: '🎯', category: 'Savings', keywords: ['savings goal calculator'], featured: false },
  { slug: 'investment-return-calculator', title: 'Investment Return Calculator', shortTitle: 'Investment Return', description: 'Calculate returns on your lumpsum investment.', metaDescription: 'Free Investment Return Calculator — Calculate lumpsum investment growth with compound returns.', icon: '💹', category: 'Investments', keywords: ['investment return calculator', 'lumpsum calculator'], featured: false },
  { slug: 'credit-card-emi-calculator', title: 'Credit Card EMI Calculator', shortTitle: 'Credit Card EMI', description: 'Convert credit card bills into easy EMIs.', metaDescription: 'Free Credit Card EMI Calculator — Convert credit card outstanding into manageable EMIs.', icon: '💳', category: 'Loans', keywords: ['credit card emi calculator'], featured: false },
  { slug: 'education-loan-calculator', title: 'Education Loan Calculator', shortTitle: 'Education Loan', description: 'Calculate education loan EMI and repayment schedule.', metaDescription: 'Free Education Loan Calculator — Plan education financing with EMI and cost breakdown.', icon: '🎓', category: 'Loans', keywords: ['education loan calculator'], featured: false },
  { slug: 'currency-converter', title: 'Currency Converter', shortTitle: 'Currency', description: 'Convert between major world currencies instantly.', metaDescription: 'Free Currency Converter — Convert between INR, USD, EUR, GBP and other major currencies.', icon: '💱', category: 'Salary', keywords: ['currency converter', 'inr to usd'], featured: false },
];

export function getCalculatorBySlug(slug: string) {
  return calculators.find(c => c.slug === slug);
}

export function getCalculatorsByCategory(category: string) {
  return calculators.filter(c => c.category === category);
}

export function getFeaturedCalculators() {
  return calculators.filter(c => c.featured);
}

export function getRelatedCalculators(slug: string, limit = 6) {
  const current = getCalculatorBySlug(slug);
  if (!current) return calculators.slice(0, limit);
  const sameCategory = calculators.filter(c => c.category === current.category && c.slug !== slug);
  const others = calculators.filter(c => c.category !== current.category && c.slug !== slug);
  return [...sameCategory, ...others].slice(0, limit);
}
