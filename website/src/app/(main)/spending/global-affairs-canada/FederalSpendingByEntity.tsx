"use client"

import { BarChart } from "@/components/BarChart";

const data = [
  { name: "Department of Foreign Affairs, Trade and Development", Amount: 8.458079 },
  { name: "Canadian Commercial Corporation", Amount: 0.013962 },
  { name: "Export Development Canada (Canada Account)", Amount: 10.522747 },
  { name: "International Development Research Centre", Amount: 0.164606 },
  { name: "International Joint Commission (Canadian Section)", Amount: 0.009192 },
  { name: "Invest in Canada Hub", Amount: 0.034272 },
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