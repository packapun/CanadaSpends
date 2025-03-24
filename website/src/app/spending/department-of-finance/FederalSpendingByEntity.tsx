"use client"

import { BarChart } from "@/components/BarChart"

const data = [
  { name: "Department of Finance", Amount: 1355.00 },
  { name: "Financial Consumer Agency of Canada", Amount: 53.37 },
  { name: "Financial Transactions and Reports Analysis Centre of Canada", Amount: 98.62 },
  { name: "Office of the Auditor General", Amount: 134.93 },
  { name: "Office of the Superintendent of Financial Institutions", Amount: 311.47 },
]

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