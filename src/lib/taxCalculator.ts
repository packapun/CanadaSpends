export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface TaxCalculation {
  grossIncome: number;
  federalTax: number;
  provincialTax: number;
  totalTax: number;
  netIncome: number;
  effectiveTaxRate: number;
}

// 2024 Federal basic personal amount (tax-free threshold)
export const FEDERAL_BASIC_PERSONAL_AMOUNT = 15000;

// 2024 Ontario basic personal amount
export const ONTARIO_BASIC_PERSONAL_AMOUNT = 12399;

// 2024 Federal tax brackets
export const FEDERAL_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 55867, rate: 0.15 },
  { min: 55867, max: 111733, rate: 0.205 },
  { min: 111733, max: 173205, rate: 0.26 },
  { min: 173205, max: 246752, rate: 0.29 },
  { min: 246752, max: null, rate: 0.33 }
];

// 2024 Ontario provincial tax brackets
export const ONTARIO_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 51446, rate: 0.0505 },
  { min: 51446, max: 102894, rate: 0.0915 },
  { min: 102894, max: 150000, rate: 0.1116 },
  { min: 150000, max: 220000, rate: 0.1216 },
  { min: 220000, max: null, rate: 0.1316 }
];

export function calculateTaxFromBrackets(income: number, brackets: TaxBracket[]): number {
  let tax = 0;
  
  for (const bracket of brackets) {
    if (income <= bracket.min) {
      break;
    }
    
    const taxableInThisBracket = Math.min(
      income - bracket.min,
      bracket.max ? bracket.max - bracket.min : income - bracket.min
    );
    
    tax += taxableInThisBracket * bracket.rate;
  }
  
  return tax;
}

export function calculateFederalTax(income: number): number {
  const taxableIncome = Math.max(0, income - FEDERAL_BASIC_PERSONAL_AMOUNT);
  return calculateTaxFromBrackets(taxableIncome, FEDERAL_TAX_BRACKETS);
}

export function calculateOntarioTax(income: number): number {
  const taxableIncome = Math.max(0, income - ONTARIO_BASIC_PERSONAL_AMOUNT);
  return calculateTaxFromBrackets(taxableIncome, ONTARIO_TAX_BRACKETS);
}

export function calculateTotalTax(income: number, province: string = 'ontario'): TaxCalculation {
  const federalTax = calculateFederalTax(income);
  
  let provincialTax = 0;
  switch (province.toLowerCase()) {
    case 'ontario':
      provincialTax = calculateOntarioTax(income);
      break;
    default:
      provincialTax = calculateOntarioTax(income); // Default to Ontario for now
  }
  
  const totalTax = federalTax + provincialTax;
  const netIncome = income - totalTax;
  const effectiveTaxRate = income > 0 ? (totalTax / income) * 100 : 0;
  
  return {
    grossIncome: income,
    federalTax,
    provincialTax,
    totalTax,
    netIncome,
    effectiveTaxRate
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercentage(rate: number): string {
  return `${rate.toFixed(1)}%`;
}