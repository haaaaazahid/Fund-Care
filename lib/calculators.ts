// Real, standard financial formulas. Every function here is pure and testable.

export function sip(monthly: number, annualRatePct: number, years: number) {
  const n = years * 12;
  const r = annualRatePct / 1200;
  const fv = r === 0 ? monthly * n : monthly * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const invested = monthly * n;
  return { futureValue: fv, invested, gain: fv - invested };
}

export function stepUpSip(startMonthly: number, annualStepPct: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 1200;
  const step = annualStepPct / 100;
  let fv = 0;
  let invested = 0;
  let monthly = startMonthly;
  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      fv = fv * (1 + r) + monthly;
      invested += monthly;
    }
    monthly = monthly * (1 + step);
  }
  return { futureValue: fv, invested, gain: fv - invested, finalMonthly: monthly / (1 + step) };
}

export function lumpsum(principal: number, annualRatePct: number, years: number) {
  const fv = principal * Math.pow(1 + annualRatePct / 100, years);
  return { futureValue: fv, invested: principal, gain: fv - principal };
}

export function cagr(start: number, end: number, years: number) {
  return (Math.pow(end / start, 1 / years) - 1) * 100;
}

export function swp(startCorpus: number, monthlyWithdrawal: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 1200;
  let corpus = startCorpus;
  let months = 0;
  const maxMonths = years * 12;
  let totalWithdrawn = 0;
  while (corpus > 0 && months < maxMonths) {
    corpus = corpus * (1 + r) - monthlyWithdrawal;
    totalWithdrawn += monthlyWithdrawal;
    months++;
    if (corpus < 0) {
      corpus = 0;
      break;
    }
  }
  const lasted = months >= maxMonths;
  return { lasted, monthsLasted: months, endingCorpus: corpus, totalWithdrawn };
}

export function retirement(opts: {
  currentAge: number;
  retirementAge: number;
  monthlyExpenseToday: number;
  inflationPct: number;
  postRetirementReturnPct: number;
  preRetirementReturnPct: number;
  lifeExpectancy: number;
}) {
  const { currentAge, retirementAge, monthlyExpenseToday, inflationPct, postRetirementReturnPct, preRetirementReturnPct, lifeExpectancy } = opts;
  const inflation = inflationPct / 100;
  const postReturn = postRetirementReturnPct / 100;
  const preReturn = preRetirementReturnPct / 100;
  const yearsToRetire = Math.max(retirementAge - currentAge, 0);
  const yearsInRetirement = Math.max(lifeExpectancy - retirementAge, 1);
  const futureMonthlyExpense = monthlyExpenseToday * Math.pow(1 + inflation, yearsToRetire);
  const futureAnnualExpense = futureMonthlyExpense * 12;
  const realReturn = (1 + postReturn) / (1 + inflation) - 1;
  const corpusNeeded =
    Math.abs(realReturn) < 0.0001
      ? futureAnnualExpense * yearsInRetirement
      : (futureAnnualExpense * (1 - Math.pow(1 + realReturn, -yearsInRetirement))) / realReturn;
  const n = yearsToRetire * 12;
  const r = preReturn / 12;
  const monthlySIP = r === 0 || n === 0 ? corpusNeeded / Math.max(n, 1) : corpusNeeded / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  return { corpusNeeded, monthlySIP, futureMonthlyExpense, yearsToRetire, yearsInRetirement };
}

export function goalPlanner(goalCostToday: number, years: number, inflationPct: number, annualReturnPct: number) {
  const inflation = inflationPct / 100;
  const futureCost = goalCostToday * Math.pow(1 + inflation, years);
  const n = years * 12;
  const r = annualReturnPct / 1200;
  const monthlySIP = r === 0 ? futureCost / n : futureCost / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  return { futureCost, monthlySIP };
}

export function emi(principal: number, annualRatePct: number, years: number) {
  const n = years * 12;
  const r = annualRatePct / 1200;
  const monthlyEmi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = monthlyEmi * n;
  return { emi: monthlyEmi, totalPayment, totalInterest: totalPayment - principal };
}

export function ppf(yearlyContribution: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100;
  let corpus = 0;
  for (let y = 0; y < years; y++) {
    corpus = (corpus + yearlyContribution) * (1 + r);
  }
  const invested = yearlyContribution * years;
  return { maturityValue: corpus, invested, gain: corpus - invested };
}

export function fixedDeposit(principal: number, annualRatePct: number, years: number, compoundingPerYear: number) {
  const fv = principal * Math.pow(1 + annualRatePct / 100 / compoundingPerYear, compoundingPerYear * years);
  return { maturityValue: fv, gain: fv - principal };
}

export function inflationImpact(costToday: number, inflationPct: number, years: number) {
  const future = costToday * Math.pow(1 + inflationPct / 100, years);
  return { futureCost: future, increase: future - costToday };
}

export function formatINR(n: number) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}
