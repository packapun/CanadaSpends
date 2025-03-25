"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

const data = {
  "spending": 13.9,
  "spending_data": {
    "name": "Public Safety Canada",
    "children": [
      {
        "name": "Personnel",
        "amount": 9.882296
      },
      {
        "name": "Transportation + Communication",
        "amount": 0.349758
      },
      {
        "name": "Information",
        "amount": 0.020448
      },
      {
        "name": "Professional + Special Services",
        "amount": 1.857377
      },
      {
        "name": "Rentals",
        "amount": 0.252258
      },
      {
        "name": "Repair + Maintenance",
        "amount": 0.207463
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.411159
      },
      {
        "name": "Acquisition of Land, Buildings and Works",
        "amount": 0.292452
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.479816
      },
      {
        "name": "Transfer Payments",
        "amount": 1.929606
      },
      {
        "name": "Public Debt Charges",
        "amount": 0.000548
      },
      {
        "name": "Other subsidies and payments",
        "amount": 0.531532
      },
      {
        "name": "External Revenues",
        "amount": -2.171511
      },
      {
        "name": "Internal Revenues",
        "amount": -0.13135
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
