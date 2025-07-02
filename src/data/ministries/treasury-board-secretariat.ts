// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Treasury Board Secretariat",
  "slug": "treasury-board-secretariat",
  "totalSpending": 1.5068189329999997,
  "spending_data": {
    "name": "Treasury Board Secretariat",
    "children": [
      {
        "name": "Treasury Board Secretariat → Centre for People, Culture and Talent",
        "children": [
          {
            "name": "Treasury Board Secretariat → Centre for People, Culture and Talent → Operations",
            "amount": 0.10059915600000001
          },
          {
            "name": "Treasury Board Secretariat → Centre for People, Culture and Talent → Other",
            "amount": 0.000064729
          }
        ]
      },
      {
        "name": "Treasury Board Secretariat → Emergency Management Ontario",
        "children": [
          {
            "name": "Treasury Board Secretariat → Emergency Management Ontario → Operations",
            "amount": 0.041658163
          },
          {
            "name": "Treasury Board Secretariat → Emergency Management Ontario → Other",
            "amount": 0.010294501999999999
          }
        ]
      },
      {
        "name": "Treasury Board Secretariat → Employee and Pensioner Benefits (Employer Share)",
        "children": [
          {
            "name": "Treasury Board Secretariat → Employee and Pensioner Benefits (Employer Share) → Operations",
            "amount": 1.0359646639999995
          }
        ]
      },
      {
        "name": "Treasury Board Secretariat → Labour Relations and Compensation",
        "children": [
          {
            "name": "Treasury Board Secretariat → Labour Relations and Compensation → Operations",
            "amount": 0.06965244799999999
          }
        ]
      },
      {
        "name": "Treasury Board Secretariat → Office of the Comptroller General",
        "children": [
          {
            "name": "Treasury Board Secretariat → Office of the Comptroller General → Operations",
            "amount": 0.051417672
          },
          {
            "name": "Treasury Board Secretariat → Office of the Comptroller General → Other",
            "amount": 0.001
          }
        ]
      },
      {
        "name": "Treasury Board Secretariat → Supply Chain",
        "children": [
          {
            "name": "Treasury Board Secretariat → Supply Chain → Operations",
            "amount": 0.006905591
          },
          {
            "name": "Treasury Board Secretariat → Supply Chain → Supply Ontario",
            "amount": 0.075258609
          }
        ]
      },
      {
        "name": "Treasury Board Secretariat → Other Programs",
        "children": [
          {
            "name": "Treasury Board Secretariat → Central Agencies Cluster → Operations",
            "amount": 0.04800780499999999
          },
          {
            "name": "Treasury Board Secretariat → Ministry Administration → Operations",
            "amount": 0.027166244
          },
          {
            "name": "Treasury Board Secretariat → Treasury Board Support → Operations",
            "amount": 0.03882934999999999
          }
        ]
      }
    ],
    "amount": 1.5068189329999997
  }
} as MinistryData;

export default ministryData;
