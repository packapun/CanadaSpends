"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function CollegesAndUniversitiesMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Colleges and Universities ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 7.1, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Colleges and Universities`,
				"children": [
					{
						"name": t`Grants for University Operating Costs`,
						"amount": 3.804397352
					},
					{
						"name": t`Grants for College Operating Costs`,
						"amount": 1.344474492
					},
					{
						"name": t`Student Financial Assistance Programs`,
						"amount": 1.316184242
					},
					{
						"name": t`Other Programs`,
						"amount": 0.25611128099999997
					},
					{
						"name": t`Grants for Research Operating Costs`,
						"amount": 0.172613407
					},
					{
						"name": t`Colleges and Universities Operations`,
						"amount": 0.11113227900000001
					},
					{
						"name": t`Capital Grants - Universities`,
						"amount": 0.111071512
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