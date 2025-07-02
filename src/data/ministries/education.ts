// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Education",
  "slug": "education",
  "totalSpending": 39.733110546000006,
  "spending_data": {
    "name": "Education",
    "children": [
      {
        "name": "Education → Child Care and Early Yearss",
        "children": [
          {
            "name": "Education → Child Care and Early Yearss → Operations",
            "amount": 0.0279356
          },
          {
            "name": "Education → Child Care and Early Yearss → Childcare Access and Relief from Expenses Tax Credit",
            "amount": 0.345602453
          },
          {
            "name": "Education → Child Care and Early Yearss → Child Care and Early Years",
            "amount": 3.880562481
          },
          {
            "name": "Education → Child Care and Early Yearss → Child Care and Early Years Capital",
            "amount": 0.109250671
          }
        ]
      },
      {
        "name": "Education → Community Services Information and Information Technology Cluster",
        "children": [
          {
            "name": "Education → Community Services Information and Information Technology Cluster → Operations",
            "amount": 0.058106948000000005
          }
        ]
      },
      {
        "name": "Education → Elementary and Secondary  Program",
        "children": [
          {
            "name": "Education → Elementary and Secondary  Program → Operations",
            "amount": 0.198498889
          },
          {
            "name": "Education → Elementary and Secondary  Program → Priorities and Partnerships Funding - School Boards",
            "amount": 0.603415442
          },
          {
            "name": "Education → Elementary and Secondary  Program → Priorities and Partnerships Funding - Third Parties",
            "amount": 0.115410121
          },
          {
            "name": "Education → Elementary and Secondary  Program → School Board Operating Grants",
            "amount": 23.137217931
          },
          {
            "name": "Education → Elementary and Secondary  Program → Education Property Tax Non-Cash Expense",
            "amount": 7.172141101
          },
          {
            "name": "Education → Elementary and Secondary  Program → Official Languages Projects",
            "amount": 0.067968642
          },
          {
            "name": "Education → Elementary and Secondary  Program → Education Quality and Accountability Office",
            "amount": 0.026426164
          },
          {
            "name": "Education → Elementary and Secondary  Program → Office des télécommunications éducatives de langue française de l'Ontario",
            "amount": 0.0298397
          },
          {
            "name": "Education → Elementary and Secondary  Program → Ontario Educational Communications Authority",
            "amount": 0.0491068
          },
          {
            "name": "Education → Elementary and Secondary  Program → Investing in Canada Infrastructure Program (ICIP)",
            "amount": 0.070606027
          },
          {
            "name": "Education → Elementary and Secondary  Program → School Board Capital Grants",
            "amount": 2.050308328
          },
          {
            "name": "Education → Elementary and Secondary  Program → School Board – Capital funding for child care",
            "amount": 0.094430731
          },
          {
            "name": "Education → Elementary and Secondary  Program → Government Costs, the Teachers' Pension Act",
            "amount": 1.652368862
          },
          {
            "name": "Education → Elementary and Secondary  Program → Other",
            "amount": 0.015104606
          }
        ]
      },
      {
        "name": "Education → Other Programs",
        "children": [
          {
            "name": "Education → Ministry Administration → Operations",
            "amount": 0.028809048999999996
          }
        ]
      }
    ],
    "amount": 39.733110546000006
  }
} as MinistryData;

export default ministryData;
