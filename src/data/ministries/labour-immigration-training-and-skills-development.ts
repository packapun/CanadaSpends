// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Labour, Immigration, Training and Skills Development",
  "slug": "labour-immigration-training-and-skills-development",
  "totalSpending": 1.9414598470000002,
  "spending_data": {
    "name": "Labour, Immigration, Training and Skills Development",
    "children": [
      {
        "name": "Labour, Immigration, Training and Skills Development → Employment Ontario",
        "children": [
          {
            "name": "Labour, Immigration, Training and Skills Development → Employment Ontario → Operations",
            "amount": 0.126564373
          },
          {
            "name": "Labour, Immigration, Training and Skills Development → Employment Ontario → Ontario Co-operative Education Tax Credit",
            "amount": 0.116276
          },
          {
            "name": "Labour, Immigration, Training and Skills Development → Employment Ontario → Employment and Training",
            "amount": 1.163764981
          },
          {
            "name": "Labour, Immigration, Training and Skills Development → Employment Ontario → Apprenticeship Enhancement Fund",
            "amount": 0.023721906
          },
          {
            "name": "Labour, Immigration, Training and Skills Development → Employment Ontario → Skills Development Fund Capital",
            "amount": 0.030278094
          },
          {
            "name": "Labour, Immigration, Training and Skills Development → Employment Ontario → Other",
            "amount": 0.007806337
          }
        ]
      },
      {
        "name": "Labour, Immigration, Training and Skills Development → Global Talent and Adult Language Training",
        "children": [
          {
            "name": "Labour, Immigration, Training and Skills Development → Global Talent and Adult Language Training → Operations",
            "amount": 0.030789099
          },
          {
            "name": "Labour, Immigration, Training and Skills Development → Global Talent and Adult Language Training → Settlement and Integration Transfer Payment",
            "amount": 0.089750203
          }
        ]
      },
      {
        "name": "Labour, Immigration, Training and Skills Development → Occupational Health and Safety",
        "children": [
          {
            "name": "Labour, Immigration, Training and Skills Development → Occupational Health and Safety → Operations",
            "amount": 0.12904639899999998
          },
          {
            "name": "Labour, Immigration, Training and Skills Development → Occupational Health and Safety → Health and Safety Associations",
            "amount": 0.104855322
          },
          {
            "name": "Labour, Immigration, Training and Skills Development → Occupational Health and Safety → Other",
            "amount": 0.015725431999999998
          }
        ]
      },
      {
        "name": "Labour, Immigration, Training and Skills Development → Other Programs",
        "children": [
          {
            "name": "Labour, Immigration, Training and Skills Development → Employment Rights and Responsibilities → Operations",
            "amount": 0.039893974
          },
          {
            "name": "Labour, Immigration, Training and Skills Development → Labour Relations → Operations",
            "amount": 0.029261267
          },
          {
            "name": "Labour, Immigration, Training and Skills Development → Ministry Administration → Operations",
            "amount": 0.030372160000000002
          },
          {
            "name": "Labour, Immigration, Training and Skills Development → Pay Equity Commission → Operations",
            "amount": 0.0033542999999999993
          }
        ]
      }
    ],
    "amount": 1.9414598470000002
  }
} as MinistryData;

export default ministryData;
