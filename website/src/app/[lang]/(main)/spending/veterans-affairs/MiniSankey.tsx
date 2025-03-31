"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

// Data from TAB 46
const data = {
  "spending": 6.1,
  "spending_data": {
    "name": "Veterans Affairs",
    "children": [
      {
        "name": "Personnel",
        "amount": 0.423984
      },
      {
        "name": "Transportation + Communication",
        "amount": 0.037427
      },
      {
        "name": "Information",
        "amount": 0.007986
      },
      {
        "name": "Professional + Special Services",
        "amount": 0.584234
      },
      {
        "name": "Rentals",
        "amount": 0.026549
      },
      {
        "name": "Repair + Maintenance",
        "amount": 0.005666
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 0.340309
      },
      {
        "name": "Acquisition of Land, Buildings and Works",
        "amount": 0.001577
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.005062
      },
      {
        "name": "Transfer Payments",
        "amount": 4.636714
      },
      {
        "name": "Public Debt Charges",
        "amount": 0
      },
      {
        "name": "Other subsidies and payments",
        "amount": 0.001682
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