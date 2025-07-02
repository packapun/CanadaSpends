// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Environment, Conservation and Parks",
  "slug": "environment-conservation-and-parks",
  "totalSpending": 0.492531089,
  "spending_data": {
    "name": "Environment, Conservation and Parks",
    "children": [
      {
        "name": "Environment, Conservation and Parks → Environmental Compliance and Operations",
        "children": [
          {
            "name": "Environment, Conservation and Parks → Environmental Compliance and Operations → Operations",
            "amount": 0.187051081
          },
          {
            "name": "Environment, Conservation and Parks → Environmental Compliance and Operations → Wastewater Surveillance Initiative",
            "amount": 0.011763356
          },
          {
            "name": "Environment, Conservation and Parks → Environmental Compliance and Operations → Other",
            "amount": 0.004459495
          }
        ]
      },
      {
        "name": "Environment, Conservation and Parks → Land and Water",
        "children": [
          {
            "name": "Environment, Conservation and Parks → Land and Water → Operations",
            "amount": 0.06050630799999999
          },
          {
            "name": "Environment, Conservation and Parks → Land and Water → Conservation Partnership – Capital",
            "amount": 0.012655
          },
          {
            "name": "Environment, Conservation and Parks → Land and Water → Other",
            "amount": 0.035644850000000006
          }
        ]
      },
      {
        "name": "Environment, Conservation and Parks → Ministry Administration",
        "children": [
          {
            "name": "Environment, Conservation and Parks → Ministry Administration → Operations",
            "amount": 0.06398518599999999
          }
        ]
      },
      {
        "name": "Environment, Conservation and Parks → Other Programs",
        "children": [
          {
            "name": "Environment, Conservation and Parks → Climate Change and Resiliency → Operations",
            "amount": 0.012667458000000001
          },
          {
            "name": "Environment, Conservation and Parks → Climate Change and Resiliency → Other",
            "amount": 0.000087
          },
          {
            "name": "Environment, Conservation and Parks → Environmental Assessment and Permissions → Operations",
            "amount": 0.035508636
          },
          {
            "name": "Environment, Conservation and Parks → Environmental Policy → Operations",
            "amount": 0.014806664
          },
          {
            "name": "Environment, Conservation and Parks → Environmental Policy → Other",
            "amount": 0.007723
          },
          {
            "name": "Environment, Conservation and Parks → Environmental Sciences and Standards → Operations",
            "amount": 0.045549055
          },
          {
            "name": "Environment, Conservation and Parks → Environmental Sciences and Standards → Other",
            "amount": 0.000124
          }
        ]
      }
    ],
    "amount": 0.492531089
  }
} as MinistryData;

export default ministryData;
