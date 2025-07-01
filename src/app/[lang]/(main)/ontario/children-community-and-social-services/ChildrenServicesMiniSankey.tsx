"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function ChildrenServicesMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Children, Community and Social Services ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 19.6, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Children, Community and Social Services`,
				"children": [
					{
						"name": t`Ontario Disability Support Program - Financial Assistance`,
						"amount": 5.866
					},
					{
						"name": t`Ontario Works - Financial Assistance`,
						"amount": 2.891
					},
					{
						"name": t`Developmental Services Supportive Living`,
						"amount": 2.262
					},
					{
						"name": t`Child Protection Services`,
						"amount": 1.681
					},
					{
						"name": t`Ontario Child Benefit`,
						"amount": 1.226
					},
					{
						"name": t`Ontario Drug Benefit Plan`,
						"amount": 1.203
					},
					{
						"name": t`Supportive Services`,
						"amount": 1.068
					},
					{
						"name": t`Ministry Operations`,
						"amount": 0.783
					},
					{
						"name": t`Autism Services`,
						"amount": 0.691
					},
					{
						"name": t`Children's Treatment and Rehabilitation`,
						"amount": 0.357
					},
					{
						"name": t`Supports to Victims of Violence`,
						"amount": 0.257
					},
					{
						"name": t`Ontario Works - Employment Assistance`,
						"amount": 0.166
					},
					{
						"name": t`Complex Special Needs`,
						"amount": 0.162
					},
					{
						"name": t`Child and Youth Community Supports`,
						"amount": 0.137
					},
					{
						"name": t`Capital Grants`,
						"amount": 0.131
					},
					{
						"name": t`Other Programs`,
						"amount": 0.735
					}
				]
			},
			revenue_data: {}
		}))
	}, [t])

	return <SankeyChart data={data as SankeyData} />
} 