// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Infrastructure",
  "slug": "infrastructure",
  "totalSpending": 1.642300858,
  "spending_data": {
    "name": "Infrastructure",
    "children": [
      {
        "name": "Infrastructure → Government Real Estate",
        "children": [
          {
            "name": "Infrastructure → Government Real Estate → Operations",
            "amount": 0.477414237
          },
          {
            "name": "Infrastructure → Government Real Estate → Other",
            "amount": 0.0042338
          }
        ]
      },
      {
        "name": "Infrastructure → Partnership Projects & Agency Oversight",
        "children": [
          {
            "name": "Infrastructure → Partnership Projects & Agency Oversight → Operations",
            "amount": 0.064819779
          },
          {
            "name": "Infrastructure → Partnership Projects & Agency Oversight → Transit Oriented Communities",
            "amount": 0.059206103
          },
          {
            "name": "Infrastructure → Partnership Projects & Agency Oversight → Toronto Waterfront Revitalization",
            "amount": 0.025
          },
          {
            "name": "Infrastructure → Partnership Projects & Agency Oversight → Other",
            "amount": 0.000768958
          }
        ]
      },
      {
        "name": "Infrastructure → Policy, Planning, and Projects",
        "children": [
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Operations",
            "amount": 0.051274600999999996
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Broadband and Cellular Infrastructure",
            "amount": 0.093419687
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Rural and Northern Infrastructure – Federal Contributions",
            "amount": 0.025931346
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Rural and Northern Infrastructure – Provincial Contributions",
            "amount": 0.013363601
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Community, Culture and Recreation (Provincial Contribution)",
            "amount": 0.057754546
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Community, Culture and Recreation (Federal Contribution)",
            "amount": 0.077531056
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Green Infrastructure (Provincial Contribution)",
            "amount": 0.049060539
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Green Infrastructure (Federal Contribution)",
            "amount": 0.077716326
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → ICIP - COVID-19 Resilience (Provincial Contribution)",
            "amount": 0.01965268
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → ICIP - COVID-19 Resilience (Federal Contribution)",
            "amount": 0.078610862
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Federal – Provincial Infrastructure Programs – Provincial Contributions",
            "amount": 0.014132307
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Federal – Provincial Infrastructure Programs – Federal Contributions",
            "amount": 0.010605071
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Municipal Infrastructure",
            "amount": 0.389012916
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Priority Local Infrastructure – Strategic Priorities and Infrastructure Fund",
            "amount": 0.029686514
          },
          {
            "name": "Infrastructure → Policy, Planning, and Projects → Other",
            "amount": 0.008102920999999999
          }
        ]
      },
      {
        "name": "Infrastructure → Other Programs",
        "children": [
          {
            "name": "Infrastructure → Ministry Administration → Operations",
            "amount": 0.015003007999999996
          }
        ]
      }
    ],
    "amount": 1.642300858
  }
} as MinistryData;

export default ministryData;
