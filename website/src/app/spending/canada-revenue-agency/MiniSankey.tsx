"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

const data = {
  "spending": 63014.246,
  "spending_data": {
    "name": "Canada Revenue Agency",
    "children": [
      {
        "name": "Personnel",
        "amount": 5.895203
      },
      {
        "name": "Transportation and Communication",
        "amount": 0.104201
      },
      {
        "name": "Information",
        "amount": 0.02778
      },
      {
        "name": "Professional and Special Services",
        "amount": 0.647165
      },
      {
        "name": "Rentals",
        "amount": 0.304
      },
      {
        "name": "Repair and Maintenance",
        "amount": 0.0567
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.015873
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.046147
      },
      {
        "name": "Transfer Payments",
        "amount": 10.177964
      },
      {
        "name": "Other subsidies and payments",
        "amount": 0.018964
      },
      {
        "name": "Internal Revenues",
        "amount": 0.491963
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
