"use client";
import { Department } from "@/lib/jurisdictions";
import { SankeyChart } from "./SankeyChart";
import { SankeyData } from "./SankeyChartD3";

function formatDepartmentAsSankey(department: Department): SankeyData {
  return {
    total: department.totalSpending,
    spending: department.totalSpending,
    revenue: 0,
    spending_data: {
      name: department.name,
      amount: department.totalSpending,
      children: [...department.spending_data.children],
    },
    revenue_data: {
      name: `Revenue`,
      amount: 0,
      children: [],
    },
  };
}

export function DepartmentMiniSankey({
  department,
}: {
  department: Department;
}) {
  const data = formatDepartmentAsSankey(department);

  return (
    <div className="sankey-chart-container spending-only">
      <SankeyChart data={data} />
    </div>
  );
}
