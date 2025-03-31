"use client"

import { BarList } from "@/components/BarList"
import { useDepartments } from "@/components/DepartmentList"
import { useMemo } from "react"


export function DepartmentSpendingChart(props: {
  department: string | string[]
}) {
  const departments = useDepartments()
  const deps = Array.isArray(props.department) ? props.department : [props.department]
  const data = useMemo(() => {
    return departments.slice(0, 10).map((item) => ({
      name: item.name,
      href: item.href,
      value: item.Percentage,
      className: deps.includes(item.name) ? "bg-emerald-500" : "",
    }))
  }, [departments, deps])


  return <BarList
    data={data}
    valueFormatter={(number: number) => Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number / 100)

    }
  />

}