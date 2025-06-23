"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function SolicitorGeneralMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Solicitor General ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 4.2, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Solicitor General`,
				"children": [
					{
						"name": t`Solicitor General Operations`,
						"amount": 3.7605899519999997
					},
					{
						"name": t`Other Programs`,
						"amount": 0.334147119
					},
					{
						"name": t`Court Security`,
						"amount": 0.125
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