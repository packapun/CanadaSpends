"use client"

import { BarChart } from "@/components/BarChart";

// This is placeholder data - Replace with real data from TAB 38
const data = [
  { name: "Department of Public Works and Government Services", Amount: 5.375281 },
  { name: "Canada Post Corporation", Amount: 0.02221 },
  { name: "National Capital Commission", Amount: 0.096902 },
  { name: "Shared Services Canada", Amount: 2.790789 },
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