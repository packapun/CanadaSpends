"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";

const data = {
  "spending": 34.49,
  "spending_data": {
    "name": "Department of National Defence",
    "children": [
      {
        "name": "Personnel",
        "amount": 16.236306
      },
      {
        "name": "Transportation + Communication",
        "amount": 0.923533
      },
      {
        "name": "Information",
        "amount": 0.027551
      },
      {
        "name": "Professional + Special Services",
        "amount": 5.602702
      },
      {
        "name": "Rentals",
        "amount": 0.715791
      },
      {
        "name": "Repair + Maintenance",
        "amount": 2.002019
      },
      {
        "name": "Utilities, Materials and Supplies",
        "amount": 1.255881
      },
      {
        "name": "Acquisition of Lands, Buildings and Works",
        "amount": 0.735367
      },
      {
        "name": "Acquisition of Machinery and Equipment",
        "amount": 5.071853
      },
      {
        "name": "Transfer Payments",
        "amount": 1.125459
      },
      {
        "name": "Public debt charges",
        "amount": 0.064426
      },
      {
        "name": "Other subsidies and payments",
        "amount": 1.087292
      },
      {
        "name": "External Revenues",
        "amount": -0.324923
      },
      {
        "name": "Internal Revenues",
        "amount": -0.029588
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
