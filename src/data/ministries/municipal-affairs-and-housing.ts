// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Municipal Affairs and Housing",
  "slug": "municipal-affairs-and-housing",
  "totalSpending": 1.776595011,
  "spending_data": {
    "name": "Municipal Affairs and Housing",
    "children": [
      {
        "name": "Municipal Affairs and Housing → Housing",
        "children": [
          {
            "name": "Municipal Affairs and Housing → Housing → Operations",
            "amount": 0.029015702999999997
          },
          {
            "name": "Municipal Affairs and Housing → Housing → Homelessness Programs",
            "amount": 0.690321393
          },
          {
            "name": "Municipal Affairs and Housing → Housing → Homelessness Programs - New Deal",
            "amount": 0.2
          },
          {
            "name": "Municipal Affairs and Housing → Housing → Community Housing Programs",
            "amount": 0.194135218
          },
          {
            "name": "Municipal Affairs and Housing → Housing → National Housing Strategy Programs",
            "amount": 0.250069683
          },
          {
            "name": "Municipal Affairs and Housing → Housing → National Housing Strategy Programs",
            "amount": 0.22193998
          },
          {
            "name": "Municipal Affairs and Housing → Housing → Homelessness Programs",
            "amount": 0.052451947
          },
          {
            "name": "Municipal Affairs and Housing → Housing → Community Housing Programs",
            "amount": 0.014343743
          },
          {
            "name": "Municipal Affairs and Housing → Housing → Other",
            "amount": 0.008
          }
        ]
      },
      {
        "name": "Municipal Affairs and Housing → Municipal Services",
        "children": [
          {
            "name": "Municipal Affairs and Housing → Municipal Services → Operations",
            "amount": -0.086065117
          },
          {
            "name": "Municipal Affairs and Housing → Municipal Services → Payments under the Municipal Tax Assistance Act",
            "amount": 0.091811314
          },
          {
            "name": "Municipal Affairs and Housing → Municipal Services → Streamline Development Approval Fund",
            "amount": 0.019553475
          },
          {
            "name": "Municipal Affairs and Housing → Municipal Services → Taxes on Tenanted Provincial Properties under the Municipal Tax Assistance Act",
            "amount": 0.010698494
          },
          {
            "name": "Municipal Affairs and Housing → Municipal Services → Priority Projects for Municipalities and Municipal Organizations",
            "amount": 0.02415
          },
          {
            "name": "Municipal Affairs and Housing → Municipal Services → Other",
            "amount": 0.009452667000000001
          }
        ]
      },
      {
        "name": "Municipal Affairs and Housing → Other Programs",
        "children": [
          {
            "name": "Municipal Affairs and Housing → Local Government and Planning Policy → Operations",
            "amount": 0.023772166
          },
          {
            "name": "Municipal Affairs and Housing → Ministry Administration → Operations",
            "amount": 0.022944345
          }
        ]
      }
    ],
    "amount": 1.776595011
  }
} as MinistryData;

export default ministryData;
