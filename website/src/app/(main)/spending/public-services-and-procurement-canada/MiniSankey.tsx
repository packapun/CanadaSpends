"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

// Real data from TAB 37
const data = {
  "spending": 8.3,
  "spending_data": {
    "name": "Public Services and Procurement Canada",
    "children": [
      {
        "name": "Personnel",
        "amount": 3.318286
      },
      {
        "name": "Transportation + Communication",
        "amount": 0.711299
      },
      {
        "name": "Information",
        "amount": 0.021606
      },
      {
        "name": "Professional + Special Services",
        "amount": 3.051013
      },
      {
        "name": "Rentals",
        "amount": 1.96169
      },
      {
        "name": "Repair + Maintenance",
        "amount": 1.613194
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.116031
      },
      {
        "name": "Acquisition of Land, Buildings and Works",
        "amount": 1.281844
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.545773
      },
      {
        "name": "Transfer Payments",
        "amount": 0.051293
      },
      {
        "name": "Public Debt Charges",
        "amount": 0.107187
      },
      {
        "name": "Other subsidies and payments",
        "amount": 0.546409
      },
      {
        "name": "External Revenues",
        "amount": -0.265103
      },
      {
        "name": "Internal Revenues",
        "amount": -4.77534
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