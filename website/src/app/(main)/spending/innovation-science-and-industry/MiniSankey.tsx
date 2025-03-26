"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

// Data from TAB 40
const data = {
  "spending": 10.2,
  "spending_data": {
    "name": "Innovation, Science and Industry",
    "children": [
      {
        "name": "Personnel",
        "amount": 2.407587
      },
      {
        "name": "Transportation + Communication",
        "amount": 0.056864
      },
      {
        "name": "Information",
        "amount": 0.034491
      },
      {
        "name": "Professional + Special Services",
        "amount": 0.57466
      },
      {
        "name": "Rentals",
        "amount": 0.095712
      },
      {
        "name": "Repair + Maintenance",
        "amount": 0.046201
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.053107
      },
      {
        "name": "Acquisition of Land, Buildings and Works",
        "amount": 0.033147
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.126316
      },
      {
        "name": "Transfer Payments",
        "amount": 7.068773
      },
      {
        "name": "Other subsidies and payments",
        "amount": 0.178779
      },
      {
        "name": "Public Debt Charges",
        "amount": 0
      },
      {
        "name": "External Revenues",
        "amount": -0.312511
      },
      {
        "name": "Internal Revenues",
        "amount": -0.144659
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