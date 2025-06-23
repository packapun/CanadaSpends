"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function AttorneyGeneralMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Attorney General ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 2.2, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Attorney General`,
				"children": [
					{
						"name": t`Attorney General Operations`,
						"amount": 1.7779056889999998
					},
					{
						"name": t`Legal Aid Ontario`,
						"amount": 0.339743282
					},
					{
						"name": t`Other Programs`,
						"amount": 0.099971563
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