"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function EducationMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Education ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 39.7, // Actual total from the Ontario Education data
			"spending_data": {
				"name": t`Ontario Education`,
				"children": [
					{
						"name": t`School Board Operating Grants`,
						"amount": 23.137
					},
					{
						"name": t`Education Property Tax Non-Cash Expense`,
						"amount": 7.172
					},
					{
						"name": t`Child Care and Early Years`,
						"amount": 3.881
					},
					{
						"name": t`School Board Capital Grants`,
						"amount": 2.050
					},
					{
						"name": t`Teacher Pension Costs`,
						"amount": 1.652
					},
					{
						"name": t`Priorities and Partnerships - School Boards`,
						"amount": 0.603
					},
					{
						"name": t`Childcare Access Tax Credit`,
						"amount": 0.346
					},
					{
						"name": t`Elementary and Secondary Operations`,
						"amount": 0.198
					},
					{
						"name": t`Priorities and Partnerships - Third Parties`,
						"amount": 0.115
					},
					{
						"name": t`Child Care Capital`,
						"amount": 0.109
					},
					{
						"name": t`School Board Childcare Capital`,
						"amount": 0.094
					},
					{
						"name": t`Infrastructure Programs`,
						"amount": 0.071
					},
					{
						"name": t`Official Languages Projects`,
						"amount": 0.068
					},
					{
						"name": t`Information Technology Services`,
						"amount": 0.058
					},
					{
						"name": t`Other Education Programs`,
						"amount": 0.190
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