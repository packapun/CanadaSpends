"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

const data = {
  "spending": 19.2,
  "spending_data": {
    "name": "Global Affairs Canada",
    "children": [
      {
        "name": "Personnel",
        "amount": 1.699961
      },
      {
        "name": "Transportation + Communication",
        "amount": 0.156031
      },
      {
        "name": "Information",
        "amount": 0.04401
      },
      {
        "name": "Professional + Special Services",
        "amount": 0.606877
      },
      {
        "name": "Rentals",
        "amount": 0.242551
      },
      {
        "name": "Repair + Maintenance",
        "amount": 0.028503
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.04754
      },
      {
        "name": "Acquisition of Land, Buildings and Works",
        "amount": 0.032242
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.052845
      },
      {
        "name": "Transfer Payments",
        "amount": 5.818928
      },
      {
        "name": "Public Debt Charges",
        "amount": 0
      },
      {
        "name": "Other subsidies and payments",
        "amount": 10.528612
      },
      {
        "name": "External Revenues",
        "amount": -0.054519
      },
      {
        "name": "Internal Revenues",
        "amount": -0.000723
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
