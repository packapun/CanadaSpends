"use client"

import { BarChart } from "@/components/BarChart";

// Data from TAB 47
const data = [
  { name: "Department of Veterans Affairs", Amount: 6.053066 },
  { name: "Veterans Review and Appeal Board", Amount: 0.018124 }
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