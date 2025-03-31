"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

// Data from TAB 49
const data = {
  "spending": 5.1,
  "spending_data": {
    "name": "Transport Canada",
    "children": [
      {
        "name": "Personnel",
        "amount": 0.921121
      },
      {
        "name": "Transportation + Communication",
        "amount": 0.029554
      },
      {
        "name": "Information",
        "amount": 0.011927
      },
      {
        "name": "Professional + Special Services",
        "amount": 0.277502
      },
      {
        "name": "Rentals",
        "amount": 0.025239
      },
      {
        "name": "Repair + Maintenance",
        "amount": 0.022232
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.017928
      },
      {
        "name": "Acquisition of Land, Buildings and Works",
        "amount": 0.116258
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.070631
      },
      {
        "name": "Transfer Payments",
        "amount": 1.652903
      },
      {
        "name": "Public Debt Charges",
        "amount": 0
      },
      {
        "name": "Other subsidies and payments",
        "amount": 2.050805
      },
      {
        "name": "External Revenues",
        "amount": -0.046939
      },
      {
        "name": "Internal Revenues",
        "amount": -0.051295
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