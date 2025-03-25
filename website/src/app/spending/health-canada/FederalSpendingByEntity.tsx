"use client"

import { BarChart } from "@/components/BarChart";

const data = [
  { name: "Department of Health", Amount: 6.842293 },
  { name: "Public Health Agency of Canada", Amount: 4.428531 },
  { name: "Canadian Institutes of Health Research", Amount: 1.348456 },
  { name: "Canadian Food Inspection Agency", Amount: 1.079322 },
  { name: "Patented Medicine Prices Review Board", Amount: 0.000014044 },
].sort((a, b) => b.Amount - a.Amount);

export function FederalSpendingByEntity() {
  return <BarChart
    className="h-72"
    data={data}
    index="name"
    categories={["Amount"]}
    yAxisWidth={400}
    layout="vertical"
    showGridLines={false}
    showXAxis={false}
    type="stacked"
  />

}