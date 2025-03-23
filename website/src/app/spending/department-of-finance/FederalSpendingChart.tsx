"use client"

import { LineChart } from "@/components/LineChart"

const chartdata = [
  {
    Year: "1995",
    Percentage: 0.328
  },
  {
    Year: "2000",
    Percentage: 0.4609
  },
  {
    Year: "2005",
    Percentage: 0.3481
  },
  {
    Year: "2010",
    Percentage: 0.2859
  },
  {
    Year: "2015",
    Percentage: 0.3074
  },
  {
    Year: "2020",
    Percentage: 0.2734
  },
  {
    Year: "2024",
    Percentage: 0.2648
  }
]

export const FederalSpendingChart = () => {
  return <LineChart
    data={chartdata}
    index="Year"
    categories={["Percentage"]}
    showLegend={false}
    valueFormatter={(number: number) =>
      Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(number)
    }
  />
}