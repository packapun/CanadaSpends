// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Seniors and Accessibility",
  "slug": "seniors-and-accessibility",
  "totalSpending": 0.171375024,
  "spending_data": {
    "name": "Seniors and Accessibility",
    "children": [
      {
        "name": "Seniors and Accessibility → Policy,, and Strategic Partnerships",
        "children": [
          {
            "name": "Seniors and Accessibility → Policy,, and Strategic Partnerships → Operations",
            "amount": 0.007997495
          },
          {
            "name": "Seniors and Accessibility → Policy,, and Strategic Partnerships → Seniors Affairs Transfer Payment",
            "amount": 0.023844549
          },
          {
            "name": "Seniors and Accessibility → Policy,, and Strategic Partnerships → Home and Vehicle Modification Program",
            "amount": 0.015628097
          },
          {
            "name": "Seniors and Accessibility → Policy,, and Strategic Partnerships → Ontario Seniors Care at Home Tax Credit",
            "amount": 0.108369997
          },
          {
            "name": "Seniors and Accessibility → Policy,, and Strategic Partnerships → Other",
            "amount": 0.001498787
          }
        ]
      },
      {
        "name": "Seniors and Accessibility → Other Programs",
        "children": [
          {
            "name": "Seniors and Accessibility → Accessibility for Ontarians with Disabilities → Operations",
            "amount": 0.007041695000000001
          },
          {
            "name": "Seniors and Accessibility → Ministry Administration → Operations",
            "amount": 0.006994403999999999
          }
        ]
      }
    ],
    "amount": 0.171375024
  }
} as MinistryData;

export default ministryData;
