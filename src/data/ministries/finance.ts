// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Finance",
  "slug": "finance",
  "totalSpending": 13.559998414999999,
  "spending_data": {
    "name": "Finance",
    "children": [
      {
        "name": "Finance → Economic, Fiscal, and Financial Policy",
        "children": [
          {
            "name": "Finance → Economic, Fiscal, and Financial Policy → Operations",
            "amount": 0.053409922
          }
        ]
      },
      {
        "name": "Finance → Ministry Administration",
        "children": [
          {
            "name": "Finance → Ministry Administration → Operations",
            "amount": 0.07257548899999999
          }
        ]
      },
      {
        "name": "Finance → Tax, Benefits and Local  Program",
        "children": [
          {
            "name": "Finance → Tax, Benefits and Local  Program → Operations",
            "amount": 0.3084532930000001
          },
          {
            "name": "Finance → Tax, Benefits and Local  Program → Guaranteed Annual Income System",
            "amount": 0.284104472
          },
          {
            "name": "Finance → Tax, Benefits and Local  Program → Ontario Municipal Partnership Fund",
            "amount": 0.501438575
          },
          {
            "name": "Finance → Tax, Benefits and Local  Program → Special Payments to Municipalities",
            "amount": 0.016692996
          },
          {
            "name": "Finance → Tax, Benefits and Local  Program → Transitional Mitigation Payment",
            "amount": 0.0516656
          },
          {
            "name": "Finance → Tax, Benefits and Local  Program → Other",
            "amount": 0.000001474
          }
        ]
      },
      {
        "name": "Finance → Treasury",
        "children": [
          {
            "name": "Finance → Treasury → Operations",
            "amount": 12.254678009
          }
        ]
      },
      {
        "name": "Finance → Other Programs",
        "children": [
          {
            "name": "Finance → Regulatory Policy and Agency Relations → Operations",
            "amount": 0.016978584999999994
          }
        ]
      }
    ],
    "amount": 13.559998414999999
  }
} as MinistryData;

export default ministryData;
