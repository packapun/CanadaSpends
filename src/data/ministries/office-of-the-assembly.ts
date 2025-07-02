// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Office of the Assembly",
  "slug": "office-of-the-assembly",
  "totalSpending": 0.19565917200000002,
  "spending_data": {
    "name": "Office of the Assembly",
    "children": [
      {
        "name": "Office of the Assembly → Office of the Assembly",
        "children": [
          {
            "name": "Office of the Assembly → Office of the Assembly → Operations",
            "amount": 0.160535373
          },
          {
            "name": "Office of the Assembly → Office of the Assembly → Other",
            "amount": 0.00033846
          }
        ]
      },
      {
        "name": "Office of the Assembly → Other Programs",
        "children": [
          {
            "name": "Office of the Assembly → Commission(er)'s → Operations",
            "amount": 0.034785339
          }
        ]
      }
    ],
    "amount": 0.19565917200000002
  }
} as MinistryData;

export default ministryData;
