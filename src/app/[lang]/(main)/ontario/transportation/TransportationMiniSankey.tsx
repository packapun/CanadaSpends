"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function TransportationMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Transportation ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 12.1, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Transportation`,
				"children": [
					{
						"name": t`Metrolinx`,
						"amount": 6.580035232
					},
					{
						"name": t`Transportation Operations`,
						"amount": 2.1633665169999996
					},
					{
						"name": t`Metrolinx Operating Subsidies`,
						"amount": 1.221041938
					},
					{
						"name": t`Municipal Transit`,
						"amount": 0.598928827
					},
					{
						"name": t`Municipal Public Transportation Funding`,
						"amount": 0.379402392
					},
					{
						"name": t`Municipal Public Transportation Funding, the Dedicated Funding for Public Transportation Act`,
						"amount": 0.374432931
					},
					{
						"name": t`Municipal Transit`,
						"amount": 0.3
					},
					{
						"name": t`Highways and Land Transfers`,
						"amount": 0.1975
					},
					{
						"name": t`Other Programs`,
						"amount": 0.15619028100000001
					},
					{
						"name": t`Ontario Northland Transportation Commission`,
						"amount": 0.102675795
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