// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Energy",
  "slug": "energy",
  "totalSpending": 6.035839838,
  "spending_data": {
    "name": "Energy",
    "children": [
      {
        "name": "Energy → Electricity Price Mitigation",
        "children": [
          {
            "name": "Energy → Electricity Price Mitigation → Ontario Electricity Support Program",
            "amount": 0.164740417
          },
          {
            "name": "Energy → Electricity Price Mitigation → Distribution Rate Protection",
            "amount": 0.374438079
          },
          {
            "name": "Energy → Electricity Price Mitigation → Rural or Remote Rate Protection Program",
            "amount": 0.25225015
          },
          {
            "name": "Energy → Electricity Price Mitigation → Northern Ontario Energy Credit",
            "amount": 0.0291004
          },
          {
            "name": "Energy → Electricity Price Mitigation → Ontario Electricity Rebate",
            "amount": 1.875270466
          },
          {
            "name": "Energy → Electricity Price Mitigation → Comprehensive Electricity Plan",
            "amount": 3.208576224
          },
          {
            "name": "Energy → Electricity Price Mitigation → Fair Hydro Trust Financing Costs",
            "amount": 0.063712218
          },
          {
            "name": "Energy → Electricity Price Mitigation → On-Reserve First Nations Delivery Credit",
            "amount": 0.02836866
          }
        ]
      },
      {
        "name": "Energy → Other Programs",
        "children": [
          {
            "name": "Energy → Development and Management Program → Operations",
            "amount": 0.019876805
          },
          {
            "name": "Energy → Development and Management Program → Other",
            "amount": 0.006083347
          },
          {
            "name": "Energy → Ministry Administration → Operations",
            "amount": 0.013423071999999998
          }
        ]
      }
    ],
    "amount": 6.035839838
  }
} as MinistryData;

export default ministryData;
