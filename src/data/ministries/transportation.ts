// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Transportation",
  "slug": "transportation",
  "totalSpending": 12.073573912999997,
  "spending_data": {
    "name": "Transportation",
    "children": [
      {
        "name": "Transportation → Labour and  Cluster Program",
        "children": [
          {
            "name": "Transportation → Labour and  Cluster Program → Operations",
            "amount": 0.069078694
          }
        ]
      },
      {
        "name": "Transportation → Ministry Administration",
        "children": [
          {
            "name": "Transportation → Ministry Administration → Operations",
            "amount": 0.061872892000000006
          }
        ]
      },
      {
        "name": "Transportation → Operations",
        "children": [
          {
            "name": "Transportation → Operations → Operations",
            "amount": 0.717104283
          },
          {
            "name": "Transportation → Operations → Connecting Links",
            "amount": 0.026752308
          },
          {
            "name": "Transportation → Operations → Transition Fund",
            "amount": 0.01
          },
          {
            "name": "Transportation → Operations → Other",
            "amount": 0.019891825000000002
          }
        ]
      },
      {
        "name": "Transportation → Oversight and Agency Governance",
        "children": [
          {
            "name": "Transportation → Oversight and Agency Governance → Operations",
            "amount": 0.17497806400000002
          }
        ]
      },
      {
        "name": "Transportation → Transit",
        "children": [
          {
            "name": "Transportation → Transit → Operations",
            "amount": -0.327112138
          },
          {
            "name": "Transportation → Transit → Metrolinx Operating Subsidies",
            "amount": 1.221041938
          },
          {
            "name": "Transportation → Transit → Municipal Transit",
            "amount": 0.3
          },
          {
            "name": "Transportation → Transit → Ontario Northland Transportation Commission",
            "amount": 0.059582375
          },
          {
            "name": "Transportation → Transit → Municipal Public Transportation Funding",
            "amount": 0.379402392
          },
          {
            "name": "Transportation → Transit → Municipal Public Transportation Funding, the Dedicated Funding for Public Transportation Act",
            "amount": 0.374432931
          },
          {
            "name": "Transportation → Transit → Metrolinx",
            "amount": 6.580035232
          },
          {
            "name": "Transportation → Transit → Municipal Transit",
            "amount": 0.598928827
          },
          {
            "name": "Transportation → Transit → Ontario Northland Transportation Commission",
            "amount": 0.102675795
          },
          {
            "name": "Transportation → Transit → Owen Sound Transportation Company",
            "amount": 0.011505195
          },
          {
            "name": "Transportation → Transit → Other",
            "amount": 0.015298624
          }
        ]
      },
      {
        "name": "Transportation → Infrastructure Management Program",
        "children": [
          {
            "name": "Transportation → Infrastructure Management Program → Operations",
            "amount": 1.290519797
          },
          {
            "name": "Transportation → Infrastructure Management Program → Payments in lieu of Municipal Taxation",
            "amount": 0.012267598
          },
          {
            "name": "Transportation → Infrastructure Management Program → Highways and Land Transfers",
            "amount": 0.1975
          }
        ]
      },
      {
        "name": "Transportation → Safety Program",
        "children": [
          {
            "name": "Transportation → Safety Program → Operations",
            "amount": 0.149904395
          },
          {
            "name": "Transportation → Safety Program → Other",
            "amount": 0.00038573000000000004
          }
        ]
      },
      {
        "name": "Transportation → Other Programs",
        "children": [
          {
            "name": "Transportation → Integrated Policy and Planning → Operations",
            "amount": 0.02702053
          },
          {
            "name": "Transportation → Integrated Policy and Planning → Other",
            "amount": 0.000506626
          }
        ]
      }
    ],
    "amount": 12.073573912999997
  }
} as MinistryData;

export default ministryData;
