"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function MunicipalAffairsAndHousingMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Municipal Affairs and Housing ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 1.8, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Municipal Affairs and Housing`,
				"children": [
					{
						"name": t`Homelessness Programs`,
						"amount": 0.690321393
					},
					{
						"name": t`National Housing Strategy Programs`,
						"amount": 0.250069683
					},
					{
						"name": t`Other Programs`,
						"amount": 0.23046164
					},
					{
						"name": t`National Housing Strategy Programs`,
						"amount": 0.22193998
					},
					{
						"name": t`Homelessness Programs - New Deal`,
						"amount": 0.2
					},
					{
						"name": t`Community Housing Programs`,
						"amount": 0.194135218
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