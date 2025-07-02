// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Natural Resources and Forestry",
  "slug": "natural-resources-and-forestry",
  "totalSpending": 0.968772363,
  "spending_data": {
    "name": "Natural Resources and Forestry",
    "children": [
      {
        "name": "Natural Resources and Forestry → Natural Resource Management",
        "children": [
          {
            "name": "Natural Resources and Forestry → Natural Resource Management → Operations",
            "amount": 0.4962468330000001
          },
          {
            "name": "Natural Resources and Forestry → Natural Resource Management → Resource Revenue Sharing for Forestry",
            "amount": 0.01401179
          },
          {
            "name": "Natural Resources and Forestry → Natural Resource Management → Forestry Initiatives",
            "amount": 0.0354257
          },
          {
            "name": "Natural Resources and Forestry → Natural Resource Management → Regional Operations Support Programs",
            "amount": 0.017887566
          },
          {
            "name": "Natural Resources and Forestry → Natural Resource Management → Forest Renewal Trust, Crown Forest Sustainability Act, 1994",
            "amount": 0.069313084
          },
          {
            "name": "Natural Resources and Forestry → Natural Resource Management → Other",
            "amount": 0.017703862
          }
        ]
      },
      {
        "name": "Natural Resources and Forestry → Public Protection",
        "children": [
          {
            "name": "Natural Resources and Forestry → Public Protection → Operations",
            "amount": 0.24635517199999998
          },
          {
            "name": "Natural Resources and Forestry → Public Protection → Other",
            "amount": 0.000655906
          }
        ]
      },
      {
        "name": "Natural Resources and Forestry → Other Programs",
        "children": [
          {
            "name": "Natural Resources and Forestry → Land and Resources Information and Information Technology Cluster → Operations",
            "amount": 0.0353703
          },
          {
            "name": "Natural Resources and Forestry → Ministry Administration → Operations",
            "amount": 0.035644133
          },
          {
            "name": "Natural Resources and Forestry → Ministry Administration → Other",
            "amount": 0.000158017
          }
        ]
      }
    ],
    "amount": 0.968772363
  }
} as MinistryData;

export default ministryData;
