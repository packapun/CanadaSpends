// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Mines",
  "slug": "mines",
  "totalSpending": 0.5552162800000001,
  "spending_data": {
    "name": "Mines",
    "children": [
      {
        "name": "Mines → and Minerals Program",
        "children": [
          {
            "name": "Mines → and Minerals Program → Operations",
            "amount": 0.41937610000000003
          },
          {
            "name": "Mines → and Minerals Program → Indigenous Economic Development",
            "amount": 0.04176066
          },
          {
            "name": "Mines → and Minerals Program → Focused Flow-Through Share Tax Credit",
            "amount": 0.023025155
          },
          {
            "name": "Mines → and Minerals Program → Ontario Junior Exploration Program",
            "amount": 0.011930446
          },
          {
            "name": "Mines → and Minerals Program → Resource Revenue Sharing for Mining",
            "amount": 0.0420702
          },
          {
            "name": "Mines → and Minerals Program → Other",
            "amount": 0.009572352999999999
          }
        ]
      },
      {
        "name": "Mines → Other Programs",
        "children": [
          {
            "name": "Mines → Ministry Administration → Operations",
            "amount": 0.007481365999999999
          }
        ]
      }
    ],
    "amount": 0.5552162800000001
  }
} as MinistryData;

export default ministryData;
