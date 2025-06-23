"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function FinanceMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Finance ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 13.6, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Finance`,
				"children": [
					{
						"name": t`Finance Operations`,
						"amount": 12.706095298
					},
					{
						"name": t`Ontario Municipal Partnership Fund`,
						"amount": 0.501438575
					},
					{
						"name": t`Guaranteed Annual Income System`,
						"amount": 0.284104472
					},
					{
						"name": t`Other Programs`,
						"amount": 0.06836007
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