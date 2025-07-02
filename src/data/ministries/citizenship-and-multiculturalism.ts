// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Citizenship and Multiculturalism",
  "slug": "citizenship-and-multiculturalism",
  "totalSpending": 0.082384445,
  "spending_data": {
    "name": "Citizenship and Multiculturalism",
    "children": [
      {
        "name": "Citizenship and Multiculturalism → Anti-racism Directorate → Operations",
        "amount": 0.008511185000000001
      },
      {
        "name": "Citizenship and Multiculturalism → Anti-racism Directorate → Anti-Racism Initiatives",
        "amount": 0.03264428
      },
      {
        "name": "Citizenship and Multiculturalism → Citizenship, Inclusion and Heritage → Operations",
        "amount": 0.011674129
      },
      {
        "name": "Citizenship and Multiculturalism → Citizenship, Inclusion and Heritage → Youth Action Plan",
        "amount": 0.020394808
      },
      {
        "name": "Citizenship and Multiculturalism → Citizenship, Inclusion and Heritage → Other",
        "amount": 0.004973005
      },
      {
        "name": "Citizenship and Multiculturalism → Ministry Administration → Operations",
        "amount": 0.004187038
      }
    ],
    "amount": 0.082384445
  }
} as MinistryData;

export default ministryData;
