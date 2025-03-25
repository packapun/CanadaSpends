"use client"

import { BarChart } from "@/components/BarChart";

const data = [
  { name: "Royal Canadian Mounted Police", Amount: 5.143298 },
  { name: "Correctional Service of Canada", Amount: 3.374962 },
  { name: "Canada Border Services Agency", Amount: 2.693911 },
  { name: "Department of Public Safety and Emergency Preparedness", Amount: 1.484124 },
  { name: "Canadian Security Intelligence Service", Amount: 0.82841 },
  { name: "Chief Electoral Officer", Amount: 0.249066 },
  { name: "Parole Board of Canada", Amount: 0.077448 },
  { name: "The Jacques-Cartier and Champlain Bridges Inc", Amount: 0.156303 },
  { name: "Commissioner of Official Languages", Amount: 0.025086 },
  { name: "Civilian Review and Complaints Commission for the RCMP", Amount: 0.015795 },
  { name: "Canadian Intergovernmental Conference Secretariat", Amount: 0.007923 },
  { name: "Correctional Investigator of Canada", Amount: 0.005813 },
  { name: "RCMP External Review Committee", Amount: 0.005372 },
  { name: "Leaders' Debates Commission", Amount: 0.000644 },
].sort((a, b) => b.Amount - a.Amount);

export function FederalSpendingByEntity() {
  return <BarChart
    className="h-90"
    data={data}
    index="name"
    categories={["Amount"]}
    yAxisWidth={400}
    layout="vertical"
    showGridLines={false}
    showXAxis={false}
    type="stacked"
  />

}