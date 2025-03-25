"use client"

import { BarChart } from "@/components/BarChart"

const data = [
  { name: "Department of National Defence", Amount: 33.47 },
  { name: "Communications and Security Establishment", Amount: 1.01 },
  { name: "Military Grievances External Review Committee", Amount: 0.01 },
  { name: "Military Police Complaints Commission", Amount: 0.01 },
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