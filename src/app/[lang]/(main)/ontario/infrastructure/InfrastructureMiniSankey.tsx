"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function InfrastructureMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Infrastructure ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 1.6, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Infrastructure`,
				"children": [
					{
						"name": t`Other Programs`,
						"amount": 0.6447763170000003
					},
					{
						"name": t`Infrastructure Operations`,
						"amount": 0.608511625
					},
					{
						"name": t`Municipal Infrastructure`,
						"amount": 0.389012916
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