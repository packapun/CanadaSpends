"use client"

import { BarChart } from "@/components/BarChart"
import { departments } from "@/components/DepartmentList"
import { useMemo } from "react"


export function DepartmentSpendingChart(props: {
  department: string
}) {
  const data = useMemo(() => {
    return departments.map((item) => ({
      name: item.name,
      Percentage: props.department === item.name ? undefined : item.Percentage,
      "Current Percentage": props.department === item.name ? item.Percentage : undefined,
      href: item.href
    }))
  }, [departments, props.department])



  return <BarChart
    className="h-72"
    data={data}
    index="name"
    categories={["Percentage", "Current Percentage"]}
    yAxisWidth={400}
    layout="vertical"
    showLegend={false}
    showGridLines={false}
    showXAxis={false}
    type="stacked"
  />

}