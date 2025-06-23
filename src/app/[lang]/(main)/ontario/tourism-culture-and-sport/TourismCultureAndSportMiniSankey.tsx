"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function TourismCultureAndSportMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Tourism, Culture, and Sport ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 1.5, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Tourism, Culture, and Sport`,
				"children": [
					{
						"name": t`Other Programs`,
						"amount": 0.5419643909999999
					},
					{
						"name": t`Ontario Production Services Tax Credit`,
						"amount": 0.4978681
					},
					{
						"name": t`Ontario Film and Television Tax Credit`,
						"amount": 0.272577665
					},
					{
						"name": t`Ontario Trillium Foundation`,
						"amount": 0.103557
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