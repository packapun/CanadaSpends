"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function MinesMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Mines ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 0.6, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Mines`,
				"children": [
					{
						"name": t`Mines Operations`,
						"amount": 0.426857466
					},
					{
						"name": t`Other Programs`,
						"amount": 0.12835881400000002
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