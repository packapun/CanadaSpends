"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

const data = {
  "spending": 63014.246,
  "spending_data": {
    "name": "ISC and CIRNAC",
    "children": [
      {
        "name": "Personnel",
        "amount": 1.267608
      },
      {
        "name": "Transportation + Communication",
        "amount": 0.555086
      },
      {
        "name": "Information",
        "amount": 0.011969
      },
      {
        "name": "Professional + Special Services",
        "amount": 1.627655
      },
      {
        "name": "Rentals",
        "amount": 0.023349
      },
      {
        "name": "Repair + Maintenance",
        "amount": 0.009626
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.702127
      },
      {
        "name": "Acquisition of Lands, Buildings and Works",
        "amount": 0.0002
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.077538
      },
      {
        "name": "Transfer Payments",
        "amount": 25.946705
      },
      {
        "name": "Other subsidies and payments",
        "amount": 32.806918
      },
      {
        "name": "External Revenues",
        "amount": -0.00598
      },
      {
        "name": "Internal Revenues",
        "amount": -0.0085547
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
