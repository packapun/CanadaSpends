// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Agriculture, Food and Rural Affairs",
  "slug": "agriculture-food-and-rural-affairs",
  "totalSpending": 0.6271433980000001,
  "spending_data": {
    "name": "Agriculture, Food and Rural Affairs",
    "children": [
      {
        "name": "Agriculture, Food and Rural Affairs → Better Public Health and Environment",
        "children": [
          {
            "name": "Agriculture, Food and Rural Affairs → Better Public Health and Environment → Operations",
            "amount": 0.058652008
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Better Public Health and Environment → Canadian Ag Partnership - Federal-Public Health and Env",
            "amount": 0.011339325
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Better Public Health and Environment → Other",
            "amount": 0.010933227
          }
        ]
      },
      {
        "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities",
        "children": [
          {
            "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities → Operations",
            "amount": 0.041825772000000004
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities → Canadian Ag Partnership-Federal-Economic Development",
            "amount": 0.022160236
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities → Food Industry",
            "amount": 0.013477891
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities → Ontario Wine Fund",
            "amount": 0.023805744
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities → University of Guelph",
            "amount": 0.071646
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities → Agricorp",
            "amount": 0.013492267
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities → AgriInsurance",
            "amount": 0.052853153
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities → AgriInvest",
            "amount": 0.0211
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities → AgriStability",
            "amount": 0.0454695
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities → Ontario Risk Management Program",
            "amount": 0.15
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Strong Agriculture, Food and Bio-product Sectors and Strong Rural Communities → Other",
            "amount": 0.050288792
          }
        ]
      },
      {
        "name": "Agriculture, Food and Rural Affairs → Other Programs",
        "children": [
          {
            "name": "Agriculture, Food and Rural Affairs → Ministry Administration → Operations",
            "amount": 0.023544455000000002
          },
          {
            "name": "Agriculture, Food and Rural Affairs → Policy Development → Operations",
            "amount": 0.016555028
          }
        ]
      }
    ],
    "amount": 0.6271433980000001
  }
} as MinistryData;

export default ministryData;
