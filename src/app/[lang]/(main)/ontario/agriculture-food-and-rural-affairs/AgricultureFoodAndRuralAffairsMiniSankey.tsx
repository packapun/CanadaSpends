"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function AgricultureFoodAndRuralAffairsMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Agriculture, Food and Rural Affairs ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 0.6, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Agriculture, Food and Rural Affairs`,
				"children": [
					{
						"name": t`Other Programs`,
						"amount": 0.336566135
					},
					{
						"name": t`Ontario Risk Management Program`,
						"amount": 0.15
					},
					{
						"name": t`Agriculture, Food and Rural Affairs Operations`,
						"amount": 0.140577263
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