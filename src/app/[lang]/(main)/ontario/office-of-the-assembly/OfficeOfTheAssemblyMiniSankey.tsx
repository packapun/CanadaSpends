"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function OfficeOfTheAssemblyMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Office of the Assembly ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 0.2, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Office of the Assembly`,
				"children": [
					{
						"name": t`Office of the Assembly Operations`,
						"amount": 0.195320712
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