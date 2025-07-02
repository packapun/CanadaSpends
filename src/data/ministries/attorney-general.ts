// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Attorney General",
  "slug": "attorney-general",
  "totalSpending": 2.217620534,
  "spending_data": {
    "name": "Attorney General",
    "children": [
      {
        "name": "Attorney General → Alcohol and Gaming Commission of Ontario",
        "children": [
          {
            "name": "Attorney General → Alcohol and Gaming Commission of Ontario → Operations",
            "amount": 0.080465072
          }
        ]
      },
      {
        "name": "Attorney General → Court Services",
        "children": [
          {
            "name": "Attorney General → Court Services → Operations",
            "amount": 0.652217761
          },
          {
            "name": "Attorney General → Court Services → Other",
            "amount": 0.002208969
          }
        ]
      },
      {
        "name": "Attorney General → Legal Services",
        "children": [
          {
            "name": "Attorney General → Legal Services → Operations",
            "amount": 0.07264589399999999
          }
        ]
      },
      {
        "name": "Attorney General → Ministry Administration",
        "children": [
          {
            "name": "Attorney General → Ministry Administration → Operations",
            "amount": 0.3090334329999999
          }
        ]
      },
      {
        "name": "Attorney General → Policy, Justices and Agencies",
        "children": [
          {
            "name": "Attorney General → Policy, Justices and Agencies → Operations",
            "amount": 0.161645337
          },
          {
            "name": "Attorney General → Policy, Justices and Agencies → Legal Aid Ontario",
            "amount": 0.339743282
          },
          {
            "name": "Attorney General → Policy, Justices and Agencies → Bail Verification and Supervision",
            "amount": 0.01349364
          },
          {
            "name": "Attorney General → Policy, Justices and Agencies → Indigenous Justice Projects",
            "amount": 0.020922679
          },
          {
            "name": "Attorney General → Policy, Justices and Agencies → Indigenous Victims' Services",
            "amount": 0.010573999
          },
          {
            "name": "Attorney General → Policy, Justices and Agencies → Other",
            "amount": 0.011275813
          }
        ]
      },
      {
        "name": "Attorney General → Prosecuting Crime",
        "children": [
          {
            "name": "Attorney General → Prosecuting Crime → Operations",
            "amount": 0.367349609
          },
          {
            "name": "Attorney General → Prosecuting Crime → Other",
            "amount": 0.011734905
          }
        ]
      },
      {
        "name": "Attorney General → Victims and Vulnerable Persons",
        "children": [
          {
            "name": "Attorney General → Victims and Vulnerable Persons → Operations",
            "amount": 0.13454858300000003
          },
          {
            "name": "Attorney General → Victims and Vulnerable Persons → Grants for Partner Assault Response Programs",
            "amount": 0.012288366
          },
          {
            "name": "Attorney General → Victims and Vulnerable Persons → Other",
            "amount": 0.005517841999999999
          }
        ]
      },
      {
        "name": "Attorney General → Other Programs",
        "children": [
          {
            "name": "Attorney General → Political Contribution Tax Credit → Political Contribution Tax Credit",
            "amount": 0.01195535
          }
        ]
      }
    ],
    "amount": 2.217620534
  }
} as MinistryData;

export default ministryData;
