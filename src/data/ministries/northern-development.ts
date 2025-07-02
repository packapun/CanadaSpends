// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Northern Development",
  "slug": "northern-development",
  "totalSpending": 0.6915137440000001,
  "spending_data": {
    "name": "Northern Development",
    "children": [
      {
        "name": "Northern Development → Northern Development",
        "children": [
          {
            "name": "Northern Development → Northern Development → Operations",
            "amount": 0.43297691299999996
          },
          {
            "name": "Northern Development → Northern Development → Northern Energy Advantage Program",
            "amount": 0.125065166
          },
          {
            "name": "Northern Development → Northern Development → Northern Ontario Heritage Fund",
            "amount": 0.05
          },
          {
            "name": "Northern Development → Northern Development → Northern Ontario Heritage Fund",
            "amount": 0.05
          },
          {
            "name": "Northern Development → Northern Development → Northern Ontario Resource Development Support Fund",
            "amount": 0.014664807
          },
          {
            "name": "Northern Development → Northern Development → Other",
            "amount": 0.012471646999999999
          }
        ]
      },
      {
        "name": "Northern Development → Other Programs",
        "children": [
          {
            "name": "Northern Development → Ministry Administration → Operations",
            "amount": 0.006335210999999999
          }
        ]
      }
    ],
    "amount": 0.6915137440000001
  }
} as MinistryData;

export default ministryData;
