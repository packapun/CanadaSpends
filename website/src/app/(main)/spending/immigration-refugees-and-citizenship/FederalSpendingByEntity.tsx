"use client"

import { BarChart } from "@/components/BarChart";

// Data from TAB 44
const data = [
  { name: "Department of Citizenship and Immigration", Amount: 5.994256 },
  { name: "Immigration and Refugee Board", Amount: 0.341256 }
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