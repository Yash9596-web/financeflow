// ===== EMI CALCULATOR =====
export function calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
  const r = annualRate / 12 / 100;
  if (r === 0) {
    const emi = principal / tenureMonths;
    return { emi, totalPayable: principal, totalInterest: 0 };
  }
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  const totalPayable = emi * tenureMonths;
  const totalInterest = totalPayable - principal;
  return { emi, totalPayable, totalInterest };
}

export function generateAmortization(principal: number, annualRate: number, tenureMonths: number) {
  const r = annualRate / 12 / 100;
  const { emi } = calculateEMI(principal, annualRate, tenureMonths);
  const schedule = [];
  let balance = principal;
  for (let i = 1; i <= tenureMonths; i++) {
    const interestPart = balance * r;
    const principalPart = emi - interestPart;
    balance -= principalPart;
    schedule.push({ month: i, emi, principal: principalPart, interest: interestPart, balance: Math.max(0, balance) });
  }
  return schedule;
}

// ===== SIP CALCULATOR =====
export function calculateSIP(monthlyInvestment: number, annualReturn: number, years: number) {
  const months = years * 12;
  const r = annualReturn / 12 / 100;
  const totalInvested = monthlyInvestment * months;
  let futureValue: number;
  if (r === 0) {
    futureValue = totalInvested;
  } else {
    futureValue = monthlyInvestment * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  }
  return { totalInvested, estimatedReturns: futureValue - totalInvested, maturityValue: futureValue };
}

export function generateSIPGrowth(monthlyInvestment: number, annualReturn: number, years: number) {
  const r = annualReturn / 12 / 100;
  const data = [];
  for (let y = 1; y <= years; y++) {
    const months = y * 12;
    const invested = monthlyInvestment * months;
    const fv = r === 0 ? invested : monthlyInvestment * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    data.push({ year: y, invested, value: fv, returns: fv - invested });
  }
  return data;
}

// ===== FD CALCULATOR =====
export function calculateFD(principal: number, annualRate: number, years: number, compoundingFreq: number = 4) {
  const maturityAmount = principal * Math.pow(1 + annualRate / (100 * compoundingFreq), compoundingFreq * years);
  const interestEarned = maturityAmount - principal;
  return { maturityAmount, interestEarned, principal };
}

// ===== RD CALCULATOR =====
export function calculateRD(monthlyDeposit: number, annualRate: number, years: number) {
  const months = years * 12;
  const r = annualRate / (4 * 100);
  const n = months;
  let maturity = 0;
  for (let i = 1; i <= n; i++) {
    const quartersRemaining = (n - i + 1) / 3;
    maturity += monthlyDeposit * Math.pow(1 + r, quartersRemaining);
  }
  const totalDeposited = monthlyDeposit * months;
  return { maturityAmount: maturity, totalDeposited, interestEarned: maturity - totalDeposited };
}

// ===== PPF CALCULATOR =====
export function calculatePPF(yearlyInvestment: number, annualRate: number, years: number) {
  let balance = 0;
  const data = [];
  for (let y = 1; y <= years; y++) {
    balance += yearlyInvestment;
    const interest = balance * (annualRate / 100);
    balance += interest;
    data.push({ year: y, deposit: yearlyInvestment, interest, balance });
  }
  const totalInvested = yearlyInvestment * years;
  return { maturityAmount: balance, totalInvested, totalInterest: balance - totalInvested, yearlyData: data };
}

// ===== GST CALCULATOR =====
export function calculateGST(amount: number, rate: number, type: 'exclusive' | 'inclusive') {
  if (type === 'exclusive') {
    const gstAmount = amount * (rate / 100);
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    return { originalAmount: amount, gstAmount, cgst, sgst, totalAmount: amount + gstAmount };
  } else {
    const originalAmount = amount / (1 + rate / 100);
    const gstAmount = amount - originalAmount;
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    return { originalAmount, gstAmount, cgst, sgst, totalAmount: amount };
  }
}

// ===== INCOME TAX CALCULATOR (India New Regime 2024-25) =====
export function calculateIncomeTax(annualIncome: number, regime: 'old' | 'new' = 'new') {
  let tax = 0;
  if (regime === 'new') {
    const slabs = [
      { limit: 300000, rate: 0 },
      { limit: 700000, rate: 5 },
      { limit: 1000000, rate: 10 },
      { limit: 1200000, rate: 15 },
      { limit: 1500000, rate: 20 },
      { limit: Infinity, rate: 30 },
    ];
    let remaining = annualIncome;
    let prev = 0;
    for (const slab of slabs) {
      const taxable = Math.min(remaining, slab.limit - prev);
      if (taxable <= 0) break;
      tax += taxable * (slab.rate / 100);
      remaining -= taxable;
      prev = slab.limit;
    }
  } else {
    const slabs = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 5 },
      { limit: 1000000, rate: 20 },
      { limit: Infinity, rate: 30 },
    ];
    let remaining = annualIncome;
    let prev = 0;
    for (const slab of slabs) {
      const taxable = Math.min(remaining, slab.limit - prev);
      if (taxable <= 0) break;
      tax += taxable * (slab.rate / 100);
      remaining -= taxable;
      prev = slab.limit;
    }
  }
  const cess = tax * 0.04;
  return { taxBeforeCess: tax, cess, totalTax: tax + cess, effectiveRate: annualIncome > 0 ? ((tax + cess) / annualIncome) * 100 : 0, netIncome: annualIncome - tax - cess };
}

// ===== SALARY CALCULATOR =====
export function calculateSalary(ctc: number) {
  const basic = ctc * 0.4;
  const hra = basic * 0.5;
  const da = basic * 0.1;
  const special = ctc - basic - hra - da - (ctc * 0.12);
  const pf = Math.min(basic * 0.12, 21600);
  const professionalTax = 2400;
  const grossSalary = ctc;
  const totalDeductions = pf + professionalTax;
  const netAnnual = grossSalary - totalDeductions;
  const netMonthly = netAnnual / 12;
  return { basic, hra, da, special: Math.max(0, special), pf, professionalTax, grossSalary, totalDeductions, netAnnual, netMonthly };
}

// ===== COMPOUND INTEREST =====
export function calculateCompoundInterest(principal: number, rate: number, time: number, frequency: number = 12) {
  const amount = principal * Math.pow(1 + rate / (100 * frequency), frequency * time);
  const interest = amount - principal;
  return { amount, interest, principal };
}

// ===== RETIREMENT CALCULATOR =====
export function calculateRetirement(currentAge: number, retirementAge: number, monthlyExpense: number, expectedReturn: number, inflationRate: number) {
  const yearsToRetire = retirementAge - currentAge;
  const yearsAfterRetirement = 85 - retirementAge;
  const futureMonthlyExpense = monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetire);
  const futureAnnualExpense = futureMonthlyExpense * 12;
  const realReturn = ((1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1);
  let corpus = 0;
  if (realReturn > 0) {
    corpus = futureAnnualExpense * ((1 - Math.pow(1 + realReturn, -yearsAfterRetirement)) / realReturn);
  } else {
    corpus = futureAnnualExpense * yearsAfterRetirement;
  }
  const monthlySaving = corpus / (((Math.pow(1 + expectedReturn / (100 * 12), yearsToRetire * 12) - 1) / (expectedReturn / (100 * 12))) * (1 + expectedReturn / (100 * 12)));
  return { corpusNeeded: corpus, futureMonthlyExpense, monthlySavingNeeded: monthlySaving, yearsToRetire, yearsAfterRetirement };
}

// ===== INFLATION CALCULATOR =====
export function calculateInflation(currentCost: number, inflationRate: number, years: number) {
  const futureCost = currentCost * Math.pow(1 + inflationRate / 100, years);
  const costIncrease = futureCost - currentCost;
  return { futureCost, costIncrease, purchasingPowerLoss: (1 - currentCost / futureCost) * 100 };
}

// ===== SAVINGS GOAL =====
export function calculateSavingsGoal(goalAmount: number, years: number, annualReturn: number) {
  const months = years * 12;
  const r = annualReturn / (12 * 100);
  const monthlySaving = r === 0 ? goalAmount / months : goalAmount / (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
  return { monthlySaving, totalInvested: monthlySaving * months, totalReturns: goalAmount - monthlySaving * months, goalAmount };
}

// ===== LOAN ELIGIBILITY =====
export function calculateLoanEligibility(monthlyIncome: number, existingEMI: number, interestRate: number, tenure: number) {
  const maxEMI = (monthlyIncome * 0.5) - existingEMI;
  const r = interestRate / (12 * 100);
  const eligibleAmount = r === 0 ? maxEMI * tenure : maxEMI * ((Math.pow(1 + r, tenure) - 1) / (r * Math.pow(1 + r, tenure)));
  return { maxEMI, eligibleAmount, monthlyIncome, existingEMI };
}
