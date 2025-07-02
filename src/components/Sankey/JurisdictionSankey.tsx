"use client";
import { SankeyChart } from "./SankeyChart";
import { SankeyData } from "./SankeyChartD3";

export function JurisdictionSankey({ data }: { data: SankeyData }) {
  return <SankeyChart data={data} />;
}
