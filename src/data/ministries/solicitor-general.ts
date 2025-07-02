// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Solicitor General",
  "slug": "solicitor-general",
  "totalSpending": 4.219737070999999,
  "spending_data": {
    "name": "Solicitor General",
    "children": [
      {
        "name": "Solicitor General → Correctional Services",
        "children": [
          {
            "name": "Solicitor General → Correctional Services → Operations",
            "amount": 1.3174446739999996
          },
          {
            "name": "Solicitor General → Correctional Services → Other",
            "amount": 0.012639534000000001
          }
        ]
      },
      {
        "name": "Solicitor General → Emergency Planning and Management",
        "children": [
          {
            "name": "Solicitor General → Emergency Planning and Management → Operations",
            "amount": 0.116240565
          },
          {
            "name": "Solicitor General → Emergency Planning and Management → Other",
            "amount": 0.005247966
          }
        ]
      },
      {
        "name": "Solicitor General → Emergency Services Telecommunications",
        "children": [
          {
            "name": "Solicitor General → Emergency Services Telecommunications → Operations",
            "amount": 0.060524896
          },
          {
            "name": "Solicitor General → Emergency Services Telecommunications → Next Generation 9-1-1",
            "amount": 0.078918755
          }
        ]
      },
      {
        "name": "Solicitor General → Infrastructure",
        "children": [
          {
            "name": "Solicitor General → Infrastructure → Operations",
            "amount": 0.245144429
          }
        ]
      },
      {
        "name": "Solicitor General → Justice Technology Services",
        "children": [
          {
            "name": "Solicitor General → Justice Technology Services → Operations",
            "amount": 0.07596900599999999
          }
        ]
      },
      {
        "name": "Solicitor General → Ministry Administration",
        "children": [
          {
            "name": "Solicitor General → Ministry Administration → Operations",
            "amount": 0.075859121
          }
        ]
      },
      {
        "name": "Solicitor General → Ontario Provincial Police",
        "children": [
          {
            "name": "Solicitor General → Ontario Provincial Police → Operations",
            "amount": 1.6412089760000002
          }
        ]
      },
      {
        "name": "Solicitor General → Public Safety Division",
        "children": [
          {
            "name": "Solicitor General → Public Safety Division → Operations",
            "amount": 0.15694872199999998
          },
          {
            "name": "Solicitor General → Public Safety Division → Community Safety and Policing Grant",
            "amount": 0.089488377
          },
          {
            "name": "Solicitor General → Public Safety Division → Miscellaneous Grants - Policing Services",
            "amount": 0.041052168
          },
          {
            "name": "Solicitor General → Public Safety Division → Federal-Provincial First Nations Policing Agreement",
            "amount": 0.074304226
          },
          {
            "name": "Solicitor General → Public Safety Division → Court Security",
            "amount": 0.125
          },
          {
            "name": "Solicitor General → Public Safety Division → Federal-Provincial First Nations Policing Agreements",
            "amount": 0.018477826
          },
          {
            "name": "Solicitor General → Public Safety Division → Other",
            "amount": 0.013366642
          }
        ]
      },
      {
        "name": "Solicitor General → Other Programs",
        "children": [
          {
            "name": "Solicitor General → Agencies, Boards and Commissions → Operations",
            "amount": 0.0009347529999999999
          },
          {
            "name": "Solicitor General → Data Insights and Strategic Initiatives → Operations",
            "amount": 0.00388241
          },
          {
            "name": "Solicitor General → Health Services → Operations",
            "amount": 0.047971983999999995
          },
          {
            "name": "Solicitor General → Health Services → Other",
            "amount": 0.000651625
          },
          {
            "name": "Solicitor General → Inspectorate → Operations",
            "amount": 0.009516043
          },
          {
            "name": "Solicitor General → Policy and Strategic Planning Division → Operations",
            "amount": 0.008944373
          }
        ]
      }
    ],
    "amount": 4.219737070999999
  }
} as MinistryData;

export default ministryData;
