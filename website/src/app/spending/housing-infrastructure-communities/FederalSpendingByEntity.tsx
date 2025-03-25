"use client"

import { BarChart } from "@/components/BarChart";

const data = [
  { name: "Office of Infrastructure of Canada", Amount: 7.619725 },
  { name: "Canada Mortgage and Housing Corporation", Amount: 5.430271 },
  { name: "Windsor-Detroit Bridge Authority", Amount: 1.289463 },
  { name: "The Jacques-Cartier and Champlain Bridges Inc", Amount: 0.156303 },
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