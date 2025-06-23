"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function EnvironmentConservationAndParksMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Environment, Conservation and Parks ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 0.5, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Environment, Conservation and Parks`,
				"children": [
					{
						"name": t`Environment, Conservation and Parks Operations`,
						"amount": 0.420074388
					},
					{
						"name": t`Other Programs`,
						"amount": 0.072456701
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