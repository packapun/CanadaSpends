// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Office of the Premier",
  "slug": "office-of-the-premier-office-of-the-premier",
  "totalSpending": 0.002410704999999999,
  "spending_data": {
    "name": "Office of the Premier",
    "children": [
      {
        "name": "Office of the Premier → Office of the Premier → Operations",
        "amount": 0.002410704999999999
      }
    ],
    "amount": 0.002410704999999999
  }
} as MinistryData;

export default ministryData;
