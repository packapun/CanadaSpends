import { TaxCalculation } from './taxCalculator';

export interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
  formattedAmount: string;
  formattedPercentage: string;
  level: 'federal' | 'provincial';
}

export interface PersonalTaxBreakdown {
  taxCalculation: TaxCalculation;
  federalSpending: SpendingCategory[];
  provincialSpending: SpendingCategory[];
  combinedSpending: SpendingCategory[];
  combinedChartData: CombinedSpendingItem[];
}

// Federal spending categories with percentages (from existing Sankey data)
const FEDERAL_SPENDING_CATEGORIES = [
  { name: 'Social Security', percentage: 23.4 },
  { name: 'Health', percentage: 18.2 },
  { name: 'Debt Charges', percentage: 9.8 },
  { name: 'Education', percentage: 8.5 },
  { name: 'Defence', percentage: 7.1 },
  { name: 'General Government Services', percentage: 6.2 },
  { name: 'Public Order and Safety', percentage: 4.8 },
  { name: 'Economic Affairs', percentage: 4.3 },
  { name: 'Housing and Community Amenities', percentage: 3.9 },
  { name: 'Environment Protection', percentage: 3.2 },
  { name: 'Recreation and Culture', percentage: 2.8 },
  { name: 'Transportation', percentage: 2.4 },
  { name: 'Agriculture and Rural Development', percentage: 1.8 },
  { name: 'International Affairs', percentage: 1.2 },
  { name: 'Immigration and Citizenship', percentage: 0.9 },
  { name: 'Natural Resources', percentage: 0.7 },
  { name: 'Justice and Legal Affairs', percentage: 0.6 },
  { name: 'Veterans Affairs', percentage: 0.5 },
  { name: 'Other', percentage: 1.4 }
];

// Ontario spending categories with percentages (from Ontario summary data)
const ONTARIO_SPENDING_CATEGORIES = [
  { name: 'Health', percentage: 36.6 },
  { name: 'Education', percentage: 19.8 },
  { name: 'Children, Community and Social Services', percentage: 9.8 },
  { name: 'Finance', percentage: 6.8 },
  { name: 'Transportation', percentage: 6.0 },
  { name: 'Long-Term Care', percentage: 3.9 },
  { name: 'Colleges and Universities', percentage: 3.5 },
  { name: 'Energy', percentage: 3.0 },
  { name: 'Solicitor General', percentage: 2.1 },
  { name: 'Attorney General', percentage: 1.1 },
  { name: 'Labour and Skills Development', percentage: 1.0 },
  { name: 'Municipal Affairs and Housing', percentage: 0.9 },
  { name: 'Infrastructure', percentage: 0.8 },
  { name: 'Treasury Board Secretariat', percentage: 0.8 },
  { name: 'Tourism, Culture, and Sport', percentage: 0.7 },
  { name: 'Economic Development and Trade', percentage: 0.6 },
  { name: 'Public and Business Services', percentage: 0.5 },
  { name: 'Natural Resources and Forestry', percentage: 0.5 },
  { name: 'Northern Development', percentage: 0.3 },
  { name: 'Agriculture and Rural Affairs', percentage: 0.3 },
  { name: 'Environment and Parks', percentage: 0.2 },
  { name: 'Other', percentage: 1.7 }
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(1)}%`;
}

function calculateSpendingByCategory(
  taxAmount: number,
  categories: { name: string; percentage: number }[],
  level: 'federal' | 'provincial'
): SpendingCategory[] {
  return categories.map(category => {
    const amount = (taxAmount * category.percentage) / 100;
    return {
      name: category.name,
      amount,
      percentage: category.percentage,
      formattedAmount: formatCurrency(amount),
      formattedPercentage: formatPercentage(category.percentage),
      level
    };
  });
}

function groupSmallAmounts(categories: SpendingCategory[], threshold: number = 20): SpendingCategory[] {
  const largeCategories = categories.filter(cat => cat.amount >= threshold && cat.name !== 'Other');
  const smallCategories = categories.filter(cat => cat.amount < threshold && cat.name !== 'Other');
  const existingOther = categories.find(cat => cat.name === 'Other');
  
  // Sort large categories by amount (descending)
  const sortedLargeCategories = largeCategories.sort((a, b) => b.amount - a.amount);
  
  // If there are small categories or an existing "Other", create/update the Other category
  if (smallCategories.length > 0 || existingOther) {
    const otherCategory: SpendingCategory = {
      name: 'Other',
      amount: smallCategories.reduce((sum, cat) => sum + cat.amount, 0) + (existingOther?.amount || 0),
      percentage: smallCategories.reduce((sum, cat) => sum + cat.percentage, 0) + (existingOther?.percentage || 0),
      formattedAmount: '',
      formattedPercentage: '',
      level: existingOther?.level || smallCategories[0]?.level || 'federal'
    };
    
    otherCategory.formattedAmount = formatCurrency(otherCategory.amount);
    otherCategory.formattedPercentage = formatPercentage(otherCategory.percentage);
    
    // Return large categories first, then "Other" at the end
    return [...sortedLargeCategories, otherCategory];
  }
  
  return sortedLargeCategories;
}

export interface CombinedSpendingItem {
  name: string;
  federalAmount: number;
  provincialAmount: number;
  totalAmount: number;
  formattedTotal: string;
}

function combineFederalAndProvincialForChart(
  federalSpending: SpendingCategory[],
  provincialSpending: SpendingCategory[]
): CombinedSpendingItem[] {
  const combined: { [key: string]: { federal: number; provincial: number } } = {};
  
  // Add federal spending
  federalSpending.forEach(category => {
    if (!combined[category.name]) {
      combined[category.name] = { federal: 0, provincial: 0 };
    }
    combined[category.name].federal = category.amount;
  });
  
  // Add provincial spending
  provincialSpending.forEach(category => {
    if (!combined[category.name]) {
      combined[category.name] = { federal: 0, provincial: 0 };
    }
    combined[category.name].provincial = category.amount;
  });
  
  // Convert to array format
  const result = Object.entries(combined).map(([name, amounts]) => ({
    name,
    federalAmount: amounts.federal,
    provincialAmount: amounts.provincial,
    totalAmount: amounts.federal + amounts.provincial,
    formattedTotal: formatCurrency(amounts.federal + amounts.provincial)
  }));
  
  // Sort by total amount (descending) and ensure "Other" is last
  return result.sort((a, b) => {
    if (a.name === 'Other') return 1;
    if (b.name === 'Other') return -1;
    return b.totalAmount - a.totalAmount;
  });
}

function combineFederalAndProvincial(
  federalSpending: SpendingCategory[],
  provincialSpending: SpendingCategory[]
): SpendingCategory[] {
  const combined: { [key: string]: SpendingCategory } = {};
  
  // Add federal spending
  federalSpending.forEach(category => {
    combined[category.name] = {
      ...category,
      level: 'federal' as const
    };
  });
  
  // Add or merge provincial spending
  provincialSpending.forEach(category => {
    if (combined[category.name]) {
      // Merge categories with same name
      combined[category.name] = {
        name: category.name,
        amount: combined[category.name].amount + category.amount,
        percentage: 0, // Will recalculate
        formattedAmount: '',
        formattedPercentage: '',
        level: 'federal' as const // Use federal as primary for combined
      };
    } else {
      combined[category.name] = {
        ...category,
        level: 'provincial' as const
      };
    }
  });
  
  // Convert back to array and recalculate percentages
  const totalAmount = Object.values(combined).reduce((sum, cat) => sum + cat.amount, 0);
  
  return Object.values(combined).map(category => ({
    ...category,
    percentage: totalAmount > 0 ? (category.amount / totalAmount) * 100 : 0,
    formattedAmount: formatCurrency(category.amount),
    formattedPercentage: formatPercentage(totalAmount > 0 ? (category.amount / totalAmount) * 100 : 0)
  })).sort((a, b) => b.amount - a.amount);
}

export function calculatePersonalTaxBreakdown(taxCalculation: TaxCalculation): PersonalTaxBreakdown {
  // Calculate federal spending breakdown
  const federalSpending = calculateSpendingByCategory(
    taxCalculation.federalTax,
    FEDERAL_SPENDING_CATEGORIES,
    'federal'
  );
  
  // Calculate provincial spending breakdown
  const provincialSpending = calculateSpendingByCategory(
    taxCalculation.provincialTax,
    ONTARIO_SPENDING_CATEGORIES,
    'provincial'
  );
  
  // Group small amounts
  const federalSpendingGrouped = groupSmallAmounts(federalSpending);
  const provincialSpendingGrouped = groupSmallAmounts(provincialSpending);
  
  // Create combined view
  const combinedSpending = groupSmallAmounts(
    combineFederalAndProvincial(federalSpending, provincialSpending)
  );
  
  // Create combined chart data for stacked bars
  const combinedChartData = combineFederalAndProvincialForChart(
    federalSpendingGrouped,
    provincialSpendingGrouped
  );
  
  return {
    taxCalculation,
    federalSpending: federalSpendingGrouped,
    provincialSpending: provincialSpendingGrouped,
    combinedSpending,
    combinedChartData
  };
}