"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function LabourImmigrationTrainingAndSkillsDevelopmentMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Labour, Immigration, Training and Skills Development ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 1.9, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Labour, Immigration, Training and Skills Development`,
				"children": [
					{
						"name": t`Employment and Training`,
						"amount": 1.163764981
					},
					{
						"name": t`Labour, Immigration, Training and Skills Development Operations`,
						"amount": 0.3892815719999999
					},
					{
						"name": t`Other Programs`,
						"amount": 0.16728197200000003
					},
					{
						"name": t`Ontario Co-operative Education Tax Credit`,
						"amount": 0.116276
					},
					{
						"name": t`Health and Safety Associations`,
						"amount": 0.104855322
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