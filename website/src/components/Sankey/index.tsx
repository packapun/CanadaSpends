"use client";

import data from "./data.json";
import { SankeyChart } from "./SankeyChart";
import { SankeyData } from "./SankeyChartD3";

export function Sankey() {
	return (
		<SankeyChart data={data as SankeyData} />
	);
}
