"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function EnergyMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Energy ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 6.0, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Energy`,
				"children": [
					{
						"name": t`Comprehensive Electricity Plan`,
						"amount": 3.208576224
					},
					{
						"name": t`Ontario Electricity Rebate`,
						"amount": 1.875270466
					},
					{
						"name": t`Distribution Rate Protection`,
						"amount": 0.374438079
					},
					{
						"name": t`Rural or Remote Rate Protection Program`,
						"amount": 0.25225015
					},
					{
						"name": t`Ontario Electricity Support Program`,
						"amount": 0.164740417
					},
					{
						"name": t`Other Programs`,
						"amount": 0.127264625
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