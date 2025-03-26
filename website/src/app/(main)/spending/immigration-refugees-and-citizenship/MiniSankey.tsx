"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

// Data from TAB 43
const data = {
  "spending": 6.3,
  "spending_data": {
    "name": "Immigration, Refugees and Citizenship",
    "children": [
      {
        "name": "Personnel",
        "amount": 1.655261
      },
      {
        "name": "Transportation + Communication",
        "amount": 0.083547
      },
      {
        "name": "Information",
        "amount": 0.013223
      },
      {
        "name": "Professional + Special Services",
        "amount": 1.669685
      },
      {
        "name": "Rentals",
        "amount": 0.442464
      },
      {
        "name": "Repair + Maintenance",
        "amount": 0.002575
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.043101
      },
      {
        "name": "Acquisition of Land, Buildings and Works",
        "amount": 0.002545
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.021627
      },
      {
        "name": "Transfer Payments",
        "amount": 2.993638
      },
      {
        "name": "Public Debt Charges",
        "amount": 0
      },
      {
        "name": "Other subsidies and payments",
        "amount": 0.024085
      },
      {
        "name": "External Revenues",
        "amount": -0.613454
      },
      {
        "name": "Internal Revenues",
        "amount": -0.002785
      }
    ]
  },
  revenue_data: {
  }
}

export function MiniSankey() {
  return (
    <div className='sankey-chart-container spending-only'>
      <SankeyChart data={data as SankeyData} />
    </div>
  );
}