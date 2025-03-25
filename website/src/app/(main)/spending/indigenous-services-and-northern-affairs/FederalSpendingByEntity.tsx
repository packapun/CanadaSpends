"use client"

import { BarChart } from "@/components/BarChart"

const data = [
  { name: "Department of Indigenous Services", Amount: 46.48 },
  { name: "Department of Crown-Indigenous Relations and Northern Affairs", Amount: 16.35 },
  { name: "Federal Economic Development Agency for Northern Ontario", Amount: 0.07 },
  { name: "Canadian High Arctic Research Station", Amount: 0.037 },
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