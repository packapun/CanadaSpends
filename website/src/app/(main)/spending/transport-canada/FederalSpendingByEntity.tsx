"use client"

import { BarChart } from "@/components/BarChart";

// Data from TAB 50
const data = [
  { name: "Department of Transport", Amount: 3.019244 },
  { name: "Canadian Air Transport Security Authority", Amount: 0.971163 },
  { name: "Canadian Transportation Agency", Amount: 0.055276 },
  { name: "Marine Atlantic Inc.", Amount: 0.191685 },
  { name: "The Federal Bridge Corporation Limited", Amount: 0.007045 },
  { name: "VIA HFR - VIA TGF Inc", Amount: 0.049503 },
  { name: "VIA Rail Canada Inc", Amount: 0.80395 }
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