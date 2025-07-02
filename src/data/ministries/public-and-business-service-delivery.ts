// Auto-generated from Ontario2024CompressedSankey.json – DO NOT EDIT BY HAND
import { SankeyNode } from "@/components/Sankey/SankeyChartD3";

type MinistryData = {
  name: string;
  slug: string;
  totalSpending: number;
  spending_data: SankeyNode;
};

const ministryData: MinistryData = {
  "name": "Public and Business Service Delivery",
  "slug": "public-and-business-service-delivery",
  "totalSpending": 1.042719266,
  "spending_data": {
    "name": "Public and Business Service Delivery",
    "children": [
      {
        "name": "Public and Business Service Delivery → Enterprise Business and Financial Services",
        "children": [
          {
            "name": "Public and Business Service Delivery → Enterprise Business and Financial Services → Operations",
            "amount": 0.32628373299999996
          },
          {
            "name": "Public and Business Service Delivery → Enterprise Business and Financial Services → Motor Vehicle Accident Claims",
            "amount": 0.015098095
          }
        ]
      },
      {
        "name": "Public and Business Service Delivery → Enterprise Information Technology Services",
        "children": [
          {
            "name": "Public and Business Service Delivery → Enterprise Information Technology Services → Operations",
            "amount": 0.20418203299999999
          }
        ]
      },
      {
        "name": "Public and Business Service Delivery → Government Services Integration Cluster",
        "children": [
          {
            "name": "Public and Business Service Delivery → Government Services Integration Cluster → Operations",
            "amount": 0.07874598200000002
          }
        ]
      },
      {
        "name": "Public and Business Service Delivery → ServiceOntario",
        "children": [
          {
            "name": "Public and Business Service Delivery → ServiceOntario → Operations",
            "amount": 0.30763130099999997
          }
        ]
      },
      {
        "name": "Public and Business Service Delivery → Other Programs",
        "children": [
          {
            "name": "Public and Business Service Delivery → Consumer Services → Operations",
            "amount": 0.019171133
          },
          {
            "name": "Public and Business Service Delivery → Consumer Services → Other",
            "amount": 0.007247964
          },
          {
            "name": "Public and Business Service Delivery → Information, Privacy and Archives → Operations",
            "amount": 0.04712182900000001
          },
          {
            "name": "Public and Business Service Delivery → Information, Privacy and Archives → Other",
            "amount": 0.00002
          },
          {
            "name": "Public and Business Service Delivery → Ministry Administration → Operations",
            "amount": 0.037217195999999994
          }
        ]
      }
    ],
    "amount": 1.042719266
  }
} as MinistryData;

export default ministryData;
