"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function LongTermCareMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Long-Term Care ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 7.9, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Long-Term Care`,
				"children": [
					{
						"name": t`Long-Term Care Operations`,
						"amount": 7.863945101
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