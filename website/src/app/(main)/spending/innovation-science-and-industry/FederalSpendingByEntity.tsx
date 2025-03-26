"use client"

import { BarChart } from "@/components/BarChart";

// Data from TAB 41
const data = [
  { name: "Department of Industry", Amount: 4.348247 },
  { name: "Canada Space Agency", Amount: 0.450747 },
  { name: "Canadian Tourism Commission", Amount: 0.122662 },
  { name: "Copyright Board", Amount: 0.004075 },
  { name: "Federal Economic Development Agency for Southern Ontario", Amount: 0.462032 },
  { name: "National Research Council of Canada", Amount: 1.525981 },
  { name: "Natural Sciences and Engineering Research Council", Amount: 1.383259 },
  { name: "Social Sciences and Humanities Research Council", Amount: 1.160335 },
  { name: "Standards Council of Canada", Amount: 0.02042 },
  { name: "Statistics Canada", Amount: 0.740709 }
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