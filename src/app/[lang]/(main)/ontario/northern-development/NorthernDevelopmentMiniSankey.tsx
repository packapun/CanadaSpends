"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function NorthernDevelopmentMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Northern Development ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 0.7, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Northern Development`,
				"children": [
					{
						"name": t`Northern Development Operations`,
						"amount": 0.43931212399999997
					},
					{
						"name": t`Other Programs`,
						"amount": 0.127136454
					},
					{
						"name": t`Northern Energy Advantage Program`,
						"amount": 0.125065166
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