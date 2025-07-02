// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Office of the Auditor General",
  "slug": "office-of-the-auditor-general",
  "totalSpending": 0.026668695000000003,
  "spending_data": {
    "name": "Office of the Auditor General",
    "children": [
      {
        "name": "Office of the Auditor General → Office of the Auditor General → Operations",
        "amount": 0.026656695
      },
      {
        "name": "Office of the Auditor General → Office of the Auditor General → Other",
        "amount": 0.000012
      }
    ],
    "amount": 0.026668695000000003
  }
} as MinistryData;

export default ministryData;
