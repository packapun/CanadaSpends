"use client"

import { BarChart } from "@/components/BarChart"
import { departments } from "@/components/DepartmentList"
import { useMemo } from "react"


export function DepartmentSpendingChart(props: {
  department: string | string[]
}) {
  const deps = Array.isArray(props.department) ? props.department : [props.department]
  const data = useMemo(() => {
    return departments.map((item) => ({
      name: item.name,
      Percentage: deps.includes(item.name) ? undefined : item.Percentage,
      "Current Percentage": deps.includes(item.name) ? item.Percentage : undefined,
    }))
  }, [departments, deps])



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