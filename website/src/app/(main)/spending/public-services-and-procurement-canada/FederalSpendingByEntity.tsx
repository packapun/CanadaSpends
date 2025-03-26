"use client"

import { BarChart } from "@/components/BarChart";

// This is placeholder data - Replace with real data from TAB 38
const data = [
  { name: "Real Property Services", Amount: 3.5 },
  { name: "Procurement Services", Amount: 2.1 },
  { name: "Public Service Pay Centre", Amount: 1.2 },
  { name: "Translation Bureau", Amount: 0.8 },
  { name: "Pension Centre", Amount: 0.7 }
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