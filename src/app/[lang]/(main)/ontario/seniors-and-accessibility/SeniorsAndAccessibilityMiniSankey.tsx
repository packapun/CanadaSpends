"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function SeniorsAndAccessibilityMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Seniors and Accessibility ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 0.2, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Seniors and Accessibility`,
				"children": [
					{
						"name": t`Ontario Seniors Care at Home Tax Credit`,
						"amount": 0.108369997
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