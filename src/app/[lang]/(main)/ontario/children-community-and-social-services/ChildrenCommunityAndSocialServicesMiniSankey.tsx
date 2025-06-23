"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function ChildrenCommunityAndSocialServicesMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Children, Community and Social Services ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 19.6, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Children, Community and Social Services`,
				"children": [
					{
						"name": t`Ontario Disability Support Program - Financial Assistance`,
						"amount": 5.865996541
					},
					{
						"name": t`Ontario Works - Financial Assistance`,
						"amount": 2.891435936
					},
					{
						"name": t`Developmental Services Supportive Living`,
						"amount": 2.26176029
					},
					{
						"name": t`Child Protection Services`,
						"amount": 1.680897997
					},
					{
						"name": t`Ontario Child Benefit`,
						"amount": 1.226
					},
					{
						"name": t`Ontario Drug Benefit Plan`,
						"amount": 1.202994043
					},
					{
						"name": t`Supportive Services`,
						"amount": 1.068047838
					},
					{
						"name": t`Children, Community and Social Services Operations`,
						"amount": 0.9306839210000003
					},
					{
						"name": t`Autism`,
						"amount": 0.691159843
					},
					{
						"name": t`Other Programs`,
						"amount": 0.46554771899999997
					},
					{
						"name": t`Children's Treatment and Rehabilitation Services`,
						"amount": 0.357218179
					},
					{
						"name": t`Supports to Victims of Violence`,
						"amount": 0.256880371
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