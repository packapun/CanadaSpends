"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function EconomicDevelopmentJobCreationAndTradeMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Economic Development, Job Creation and Trade ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 1.3, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Economic Development, Job Creation and Trade`,
				"children": [
					{
						"name": t`Other Programs`,
						"amount": 0.28303008700000004
					},
					{
						"name": t`Ontario Made Manufacturing Investment Tax Credit`,
						"amount": 0.22
					},
					{
						"name": t`Economic Development, Job Creation and Trade Operations`,
						"amount": 0.21239511900000002
					},
					{
						"name": t`Regional Opportunities Investment Tax Credit`,
						"amount": 0.160416674
					},
					{
						"name": t`Ontario Innovation Tax Credit`,
						"amount": 0.157749179
					},
					{
						"name": t`Industrial Land Development`,
						"amount": 0.14730411
					},
					{
						"name": t`Jobs and Prosperity Fund and Other Business Support Programs`,
						"amount": 0.101737765
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