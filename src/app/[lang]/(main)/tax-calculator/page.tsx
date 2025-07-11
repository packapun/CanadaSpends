"use client";

import { useState, useMemo } from "react";
import { useLingui } from "@lingui/react/macro";
import { H1, H2, PageContent, Section } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { BarChart } from "@/components/BarChart";
import { calculateTotalTax } from "@/lib/taxCalculator";
import { calculatePersonalTaxBreakdown, SpendingCategory } from "@/lib/personalTaxBreakdown";

interface TaxCalculatorFormProps {
  income: number;
  setIncome: (income: number) => void;
  province: string;
  setProvince: (province: string) => void;
}

function TaxCalculatorForm({ income, setIncome, province, setProvince }: TaxCalculatorFormProps) {
  const { t } = useLingui();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <H2>{t`Calculate Your Tax Contribution`}</H2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-2">
            {t`Annual Income (CAD)`}
          </label>
          <input
            type="number"
            id="income"
            value={income || ""}
            onChange={(e) => setIncome(Number(e.target.value))}
            placeholder="100000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
            {t`Province/Territory`}
          </label>
          <select
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ontario">{t`Ontario`}</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">
            {t`Currently supports Ontario only. More provinces coming soon.`}
          </p>
        </div>
      </div>
    </div>
  );
}

interface TaxSummaryProps {
  taxCalculation: ReturnType<typeof calculateTotalTax>;
}

function TaxSummary({ taxCalculation }: TaxSummaryProps) {
  const { t } = useLingui();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title={t`Federal Tax`}
        value={`$${taxCalculation.federalTax.toLocaleString()}`}
        description={t`Income tax paid to federal government`}
      />
      <StatCard
        title={t`Provincial Tax`}
        value={`$${taxCalculation.provincialTax.toLocaleString()}`}
        description={t`Income tax paid to provincial government`}
      />
      <StatCard
        title={t`Total Tax`}
        value={`$${taxCalculation.totalTax.toLocaleString()}`}
        description={t`Combined federal and provincial tax`}
      />
      <StatCard
        title={t`Effective Rate`}
        value={`${taxCalculation.effectiveTaxRate.toFixed(1)}%`}
        description={t`Your effective tax rate`}
      />
    </div>
  );
}

interface SpendingVisualizationProps {
  spendingData: SpendingCategory[];
  title: string;
}

function SpendingVisualization({ spendingData, title }: SpendingVisualizationProps) {
  const chartData = spendingData.map(category => ({
    name: category.name,
    value: category.amount,
    percentage: category.percentage,
    formattedValue: category.formattedAmount
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <H2>{title}</H2>
      <div className="mt-6">
        <BarChart
          data={chartData}
          xAxisDataKey="name"
          yAxisDataKey="value"
          tooltipFormatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]}
          showLegend={false}
        />
      </div>
      
      <div className="mt-6 space-y-2">
        {spendingData.map((category, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700">{category.name}</span>
            <div className="text-right">
              <span className="text-sm font-semibold text-gray-900">{category.formattedAmount}</span>
              <span className="text-xs text-gray-500 ml-2">({category.formattedPercentage})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TaxCalculatorPage() {
  const { t } = useLingui();
  const [income, setIncome] = useState<number>(100000);
  const [province, setProvince] = useState<string>("ontario");
  
  const taxCalculation = useMemo(() => {
    if (income <= 0) return null;
    return calculateTotalTax(income, province);
  }, [income, province]);
  
  const breakdown = useMemo(() => {
    if (!taxCalculation) return null;
    return calculatePersonalTaxBreakdown(taxCalculation);
  }, [taxCalculation]);

  return (
    <PageContent>
      <Section>
        <div className="text-center mb-8">
          <H1>{t`Personal Income Tax Visualizer`}</H1>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            {t`Discover where your tax dollars go. Enter your income to see a personalized breakdown of how much you contribute to different government services and programs.`}
          </p>
        </div>

        <TaxCalculatorForm
          income={income}
          setIncome={setIncome}
          province={province}
          setProvince={setProvince}
        />

        {taxCalculation && breakdown && (
          <>
            <div className="mt-8">
              <TaxSummary taxCalculation={taxCalculation} />
            </div>

            <div className="mt-12 space-y-8">
              <SpendingVisualization
                spendingData={breakdown.combinedSpending}
                title={t`Where Your Tax Dollars Go`}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SpendingVisualization
                  spendingData={breakdown.federalSpending}
                  title={t`Federal Tax Contribution ($${breakdown.taxCalculation.federalTax.toLocaleString()})`}
                />
                
                <SpendingVisualization
                  spendingData={breakdown.provincialSpending}
                  title={t`Provincial Tax Contribution ($${breakdown.taxCalculation.provincialTax.toLocaleString()})`}
                />
              </div>
            </div>

            <div className="mt-12 bg-blue-50 p-6 rounded-lg">
              <H2>{t`Understanding Your Tax Contribution`}</H2>
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <p>
                  {t`This visualization shows how your income tax contributions are allocated across different government programs and services based on current government spending patterns.`}
                </p>
                <p>
                  {t`Federal taxes support national programs like healthcare transfers, employment insurance, and national defence. Provincial taxes fund education, healthcare delivery, and social services.`}
                </p>
                <p>
                  {t`Tax calculations are based on 2024 federal and Ontario tax brackets. Amounts under $20 are grouped into "Other" for clarity.`}
                </p>
              </div>
            </div>
          </>
        )}
      </Section>
    </PageContent>
  );
}