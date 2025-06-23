"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function OfficeOfTheLieutenantGovernorOfficeOfTheLieutenantGovernorMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Office of the Lieutenant Governor → Office of the Lieutenant Governor ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 0.0, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Office of the Lieutenant Governor → Office of the Lieutenant Governor`,
				"children": [

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