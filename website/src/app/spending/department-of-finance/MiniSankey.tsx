"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

const data = {
  "spending": 136.1,
  "spending_data": {
    "name": "Department of Finance",
    "children": [
      {
        "name": "Canada health transfer",
        "amount": 51.43
      },
      {
        "name": "Canada social transfer",
        "amount": 16.42
      },
      {
        "name": "Fiscal arrangements",
        "amount": 29.42
      },
      {
        "name": "Quebec abatement",
        "amount": -7.10
      },
      {
        "name": "Other",
        "amount": 1.00
      },
      {
        "name": "Other expenditures",
        "amount": 2.47
      },
      {
        "name": "Public debt charges",
        "amount": 42.47
      }
    ]
  },
  revenue_data: {}
}

export function MiniSankey() {
  return (
    <div className='sankey-chart-container spending-only'>
      <SankeyChart data={data as SankeyData} />
    </div>
  );
}
