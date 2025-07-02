// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Francophone Affairs",
  "slug": "francophone-affairs",
  "totalSpending": 0.008025964,
  "spending_data": {
    "name": "Francophone Affairs",
    "children": [
      {
        "name": "Francophone Affairs → Francophone Affairs → Operations",
        "amount": 0.004959844999999999
      },
      {
        "name": "Francophone Affairs → Francophone Affairs → Other",
        "amount": 0.003066119
      }
    ],
    "amount": 0.008025964
  }
} as MinistryData;

export default ministryData;
