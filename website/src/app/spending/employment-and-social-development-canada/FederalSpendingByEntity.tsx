"use client"

import { BarChart } from "@/components/BarChart"

const data = [
  { name: "Department of Employment and Social Development", Amount: 94440.00 },
  { name: "Canadian Accessibility Standards Development Organization", Amount: 21.00 },
  { name: "Canadian Centre for Occupational Health and Safety", Amount: 15.00 },
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