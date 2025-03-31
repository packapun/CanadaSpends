"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

const data = {
  "spending": 13.64,
  "spending_data": {
    "name": "Health Canada",
    "children": [
      {
        "name": "Personnel",
        "amount": 2.636333
      },
      {
        "name": "Transportation + Communication",
        "amount": 0.034712
      },
      {
        "name": "Information",
        "amount": 0.093827
      },
      {
        "name": "Professional + Special Services",
        "amount": 0.774417
      },
      {
        "name": "Rentals",
        "amount": 0.063698
      },
      {
        "name": "Repair + Maintenance",
        "amount": 0.040553
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 3.038712
      },
      {
        "name": "Acquisition of Lands, Buildings and Works",
        "amount": 0.000001072
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 0.000093304
      },
      {
        "name": "Transfer Payments",
        "amount": 7.175537
      },
      {
        "name": "Other subsidies and payments",
        "amount": 0.000004913
      },
      {
        "name": "External Revenues",
        "amount": -0.213425
      },
      {
        "name": "Internal Revenues",
        "amount": 0.000031007
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
