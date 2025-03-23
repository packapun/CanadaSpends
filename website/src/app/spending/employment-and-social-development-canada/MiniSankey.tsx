"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

const data = {
  spending: 97.282,
  "spending_data": {
    "name": "Department of Finance",
    "children": [
      {
        "name": "Personnel",
        "amount": 4.01
      },
      {
        "name": "Transportation and Communication",
        "amount": 0.09
      },
      {
        "name": "Information",
        "amount": 0.10
      },
      {
        "name": "Professional and Special Services",
        "amount": 1.02
      },
      {
        "name": "Rentals",
        "amount": 0.31
      },
      {
        "name": "Repair and Maintenance",
        "amount": 0.003
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.005
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.05
      },
      {
        "name": "Transfer Payments",
        "amount": 91.50
      },
      {
        "name": "Other Subsidies and Payments",
        "amount": 0.19
      },
      {
        "name": "External Revenues",
        amount: -0.55
      },
      {
        "name": "Internal Revenues",
        amount: -2.252413
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
