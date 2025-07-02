// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Colleges and Universities",
  "slug": "colleges-and-universities",
  "totalSpending": 7.115984565,
  "spending_data": {
    "name": "Colleges and Universities",
    "children": [
      {
        "name": "Colleges and Universities → Postsecondary Education",
        "children": [
          {
            "name": "Colleges and Universities → Postsecondary Education → Operations",
            "amount": 0.08697249800000001
          },
          {
            "name": "Colleges and Universities → Postsecondary Education → Grants for Indigenous Institute Operating Costs",
            "amount": 0.033828767
          },
          {
            "name": "Colleges and Universities → Postsecondary Education → Grants for College Operating Costs",
            "amount": 1.344474492
          },
          {
            "name": "Colleges and Universities → Postsecondary Education → Grants for University Operating Costs",
            "amount": 3.804397352
          },
          {
            "name": "Colleges and Universities → Postsecondary Education → Postsecondary Transformation",
            "amount": 0.0136
          },
          {
            "name": "Colleges and Universities → Postsecondary Education → Student Financial Assistance Programs",
            "amount": 1.316184242
          },
          {
            "name": "Colleges and Universities → Postsecondary Education → Capital Grants - Colleges",
            "amount": 0.095892516
          },
          {
            "name": "Colleges and Universities → Postsecondary Education → Capital Grants - Universities",
            "amount": 0.111071512
          },
          {
            "name": "Colleges and Universities → Postsecondary Education → Other",
            "amount": 0.005508598
          }
        ]
      },
      {
        "name": "Colleges and Universities → Research",
        "children": [
          {
            "name": "Colleges and Universities → Research → Operations",
            "amount": 0.00827326
          },
          {
            "name": "Colleges and Universities → Research → Grants for Research Operating Costs",
            "amount": 0.172613407
          },
          {
            "name": "Colleges and Universities → Research → Ontario Research Fund - Research Infrastructure",
            "amount": 0.0995991
          },
          {
            "name": "Colleges and Universities → Research → Other",
            "amount": 0.0076823
          }
        ]
      },
      {
        "name": "Colleges and Universities → Other Programs",
        "children": [
          {
            "name": "Colleges and Universities → Ministry Administration → Operations",
            "amount": 0.015886521000000004
          }
        ]
      }
    ],
    "amount": 7.115984565
  }
} as MinistryData;

export default ministryData;
