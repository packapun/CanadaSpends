"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function NaturalResourcesAndForestryMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Natural Resources and Forestry ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 1.0, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Natural Resources and Forestry`,
				"children": [
					{
						"name": t`Natural Resources and Forestry Operations`,
						"amount": 0.831504004
					},
					{
						"name": t`Other Programs`,
						"amount": 0.137268359
					}
				]
			},
			revenue_data: {}
		}))
	}, [t])

	return (
		<div className='sankey-chart-container spending-only'>
			<SankeyChart data={data as SankeyData} />
		</div>
	);
}