export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  featured: boolean;
  tags: string[];
}

export const blogCategories = ['Loans', 'Investment', 'Taxes', 'Savings', 'Retirement', 'Insurance', 'Financial Planning'] as const;

export const blogPosts: BlogPost[] = [
  { slug: 'best-sip-investment-plans-2025', title: 'Best SIP Investment Plans for 2025 — Maximize Your Returns', excerpt: 'Discover the top-performing SIP plans and learn how to build long-term wealth through systematic investing.', category: 'Investment', author: 'FinanceFlow Team', readTime: '8 min', date: '2025-01-15', featured: true, tags: ['SIP', 'Mutual Funds', 'Investment'] },
  { slug: 'home-loan-interest-rates-guide', title: 'Home Loan Interest Rates 2025 — Complete Guide', excerpt: 'Compare home loan interest rates from top banks and find the best deal for your dream home.', category: 'Loans', author: 'FinanceFlow Team', readTime: '10 min', date: '2025-01-12', featured: true, tags: ['Home Loan', 'Interest Rates'] },
  { slug: 'income-tax-saving-strategies', title: '10 Smart Tax Saving Strategies Every Salaried Person Must Know', excerpt: 'Reduce your tax liability legally with these proven strategies under old and new tax regimes.', category: 'Taxes', author: 'FinanceFlow Team', readTime: '7 min', date: '2025-01-10', featured: true, tags: ['Tax Planning', 'Income Tax'] },
  { slug: 'retirement-planning-beginners-guide', title: 'Retirement Planning: A Beginner\'s Complete Guide', excerpt: 'Start planning for retirement early. Learn how much corpus you need and the best investment options.', category: 'Retirement', author: 'FinanceFlow Team', readTime: '12 min', date: '2025-01-08', featured: false, tags: ['Retirement', 'Financial Planning'] },
  { slug: 'fd-vs-rd-which-is-better', title: 'FD vs RD — Which Savings Option Is Better for You?', excerpt: 'A detailed comparison of Fixed Deposits and Recurring Deposits to help you choose the right savings instrument.', category: 'Savings', author: 'FinanceFlow Team', readTime: '6 min', date: '2025-01-05', featured: false, tags: ['FD', 'RD', 'Savings'] },
  { slug: 'understanding-gst-for-businesses', title: 'Understanding GST for Small Businesses — Complete Guide', excerpt: 'Everything small business owners need to know about GST registration, filing, and compliance.', category: 'Taxes', author: 'FinanceFlow Team', readTime: '9 min', date: '2025-01-03', featured: false, tags: ['GST', 'Business'] },
  { slug: 'health-insurance-tax-benefits', title: 'Health Insurance Tax Benefits Under Section 80D', excerpt: 'Learn how health insurance premiums can save you significant tax under Section 80D.', category: 'Insurance', author: 'FinanceFlow Team', readTime: '5 min', date: '2024-12-28', featured: false, tags: ['Insurance', 'Tax Benefits'] },
  { slug: 'personal-finance-mistakes-to-avoid', title: '15 Personal Finance Mistakes You Must Avoid in Your 20s & 30s', excerpt: 'Common financial mistakes that can cost you lakhs. Learn what to avoid for a strong financial future.', category: 'Financial Planning', author: 'FinanceFlow Team', readTime: '11 min', date: '2024-12-25', featured: true, tags: ['Personal Finance', 'Money Management'] },
];

export function getFeaturedPosts() {
  return blogPosts.filter(p => p.featured);
}

export function getPostsByCategory(category: string) {
  return blogPosts.filter(p => p.category === category);
}
