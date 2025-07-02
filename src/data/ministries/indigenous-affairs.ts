// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Indigenous Affairs",
  "slug": "indigenous-affairs",
  "totalSpending": 0.146562694,
  "spending_data": {
    "name": "Indigenous Affairs",
    "children": [
      {
        "name": "Indigenous Affairs → Operations",
        "amount": 0.04098142200000001
      },
      {
        "name": "Indigenous Affairs → Indigenous Economic Development Fund",
        "amount": 0.011685164
      },
      {
        "name": "Indigenous Affairs → Support for Community Negotiations Fund",
        "amount": 0.012345701
      },
      {
        "name": "Indigenous Affairs → New Relationship Fund",
        "amount": 0.0118745
      },
      {
        "name": "Indigenous Affairs → Support for Indian Residential School Burial Sites",
        "amount": 0.031388447
      },
      {
        "name": "Indigenous Affairs → Land Claim Settlements",
        "amount": 0.017150381
      },
      {
        "name": "Indigenous Affairs → Other",
        "amount": 0.021137079
      }
    ],
    "amount": 0.146562694
  }
} as MinistryData;

export default ministryData;
