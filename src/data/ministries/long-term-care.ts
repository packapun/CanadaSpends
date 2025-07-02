// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Long-Term Care",
  "slug": "long-term-care",
  "totalSpending": 7.892942800999999,
  "spending_data": {
    "name": "Long-Term Care",
    "children": [
      {
        "name": "Long-Term Care → Homes Program",
        "children": [
          {
            "name": "Long-Term Care → Homes Program → Operations",
            "amount": 0.080617971
          },
          {
            "name": "Long-Term Care → Homes Program → Long-Term Care Homes – Operations",
            "amount": 7.774612836
          },
          {
            "name": "Long-Term Care → Homes Program → Long-Term Care Homes - Capital",
            "amount": 0.0289977
          }
        ]
      },
      {
        "name": "Long-Term Care → Other Programs",
        "children": [
          {
            "name": "Long-Term Care → Ministry Administration → Operations",
            "amount": 0.008714294
          }
        ]
      }
    ],
    "amount": 7.892942800999999
  }
} as MinistryData;

export default ministryData;
