"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

// This is placeholder data - Replace with real data from TAB 37
const data = {
  "spending": 8.3,
  "spending_data": {
    "name": "Public Services and Procurement Canada",
    "children": [
      {
        "name": "Personnel",
        "amount": 2.1
      },
      {
        "name": "Transportation + Communication",
        "amount": 0.25
      },
      {
        "name": "Information",
        "amount": 0.05
      },
      {
        "name": "Professional + Special Services",
        "amount": 1.8
      },
      {
        "name": "Rentals",
        "amount": 0.7
      },
      {
        "name": "Repair + Maintenance",
        "amount": 0.9
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.3
      },
      {
        "name": "Acquisition of Lands, Buildings and Works",
        "amount": 0.4
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.15
      },
      {
        "name": "Transfer Payments",
        "amount": 1.5
      },
      {
        "name": "Other subsidies and payments",
        "amount": 0.2
      },
      {
        "name": "External Revenues",
        "amount": -0.05
      },
      {
        "name": "Internal Revenues",
        "amount": 0.0
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