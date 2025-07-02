// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Ombudsman Ontario",
  "slug": "ombudsman-ontario",
  "totalSpending": 0.028211491999999998,
  "spending_data": {
    "name": "Ombudsman Ontario",
    "children": [
      {
        "name": "Ombudsman Ontario → Ombudsman Ontario → Operations",
        "amount": 0.028211491999999998
      }
    ],
    "amount": 0.028211491999999998
  }
} as MinistryData;

export default ministryData;
