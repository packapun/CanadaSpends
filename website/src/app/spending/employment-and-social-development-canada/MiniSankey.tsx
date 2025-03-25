"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

const data = {
  spending: 97.282,
  "spending_data": {
    "name": "ESDC",
    "children": [
      {
        "name": "Personnel",
        "amount": 4.013769
      },
      {
        "name": "Transportation and Communication",
        "amount": 0.087711
      },
      {
        "name": "Information",
        "amount": 0.095566
      },
      {
        "name": "Professional and Special Services",
        "amount": 1.021141
      },
      {
        "name": "Rentals",
        "amount": 0.312904
      },
      {
        "name": "Repair and Maintenance",
        "amount": 0.002714
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.004768
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.047273
      },
      {
        "name": "Transfer Payments",
        "amount": 91.50417
      },
      {
        "name": "Other Subsidies and Payments",
        "amount": 0.192769
      },
      {
        "name": "External Revenues",
        "amount": -0.55039
      },
      {
        "name": "Internal Revenues",
        "amount": -2.252413
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
