import { BarChart } from "@/components/BarChart"
import { useMemo } from "react"

const chartdata = [
  {
    name: "Department of Finance",
    amount: 136.10,
    Percentage: 26.48
  },
  {
    name: "Department of Employment and Social Development",
    amount: 94.48,
    Percentage: 18.38
  },
  {
    name: "Department of Indigenous Services",
    amount: 46.55,
    Percentage: 9.06
  },
  {
    name: "Department of National Defence",
    amount: 34.49,
    Percentage: 6.71
  },
  {
    name: "Department of Foreign Affairs, Trade and Development",
    amount: 19.20,
    Percentage: 3.74
  },
  {
    name: "Canada Revenue Agency",
    amount: 16.80,
    Percentage: 3.27
  },
  {
    name: "Department of Crown-Indigenous Relations and Northern Affairs",
    amount: 16.39,
    Percentage: 3.19
  },
  {
    name: "Department of Housing, Infrastructure and Communities",
    amount: 14.50,
    Percentage: 2.82
  },
  {
    name: "Department of Public Safety and Emergency Preparedness",
    amount: 13.91,
    Percentage: 2.71
  },
  {
    name: "Department of Health",
    amount: 13.71,
    Percentage: 2.67
  }
]

export function FederalSpendingChart(props: {
  department: string
}) {

  const data = useMemo(() => {
    return chartdata.map((item) => ({
      name: item.name,
      Percentage: props.department === item.name ? undefined : item.Percentage,
      "Current Percentage": props.department === item.name ? item.Percentage : undefined,
    }))
  }, [props.department])



  return <BarChart
    className="h-72"
    data={data}
    index="name"
    categories={["Percentage", "Current Percentage"]}
    yAxisWidth={400}
    layout="vertical"
    showLegend={false}
    showGridLines={false}
    type="stacked"
  />

}