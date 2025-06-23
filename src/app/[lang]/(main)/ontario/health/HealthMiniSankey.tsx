"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function HealthMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Health ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 73.4, // Actual total from the Ontario Health data
			"spending_data": {
				"name": t`Ontario Health`,
				"children": [
					{
						"name": t`Operation of Hospitals`,
						"amount": 25.583
					},
					{
						"name": t`Physician and Practitioner Payments`,
						"amount": 18.802
					},
					{
						"name": t`Ontario Drug Programs`,
						"amount": 6.025
					},
					{
						"name": t`Home Care`,
						"amount": 4.065
					},
					{
						"name": t`Cancer Treatment Services`,
						"amount": 1.599
					},
					{
						"name": t`Major Hospital Projects`,
						"amount": 1.422
					},
					{
						"name": t`Public Health Operations`,
						"amount": 1.310
					},
					{
						"name": t`Community Mental Health`,
						"amount": 1.101
					},
					{
						"name": t`Clinical Education`,
						"amount": 1.069
					},
					{
						"name": t`Local Health Agencies`,
						"amount": 1.027
					},
					{
						"name": t`Ambulance Services`,
						"amount": 0.950
					},
					{
						"name": t`Community Support Services`,
						"amount": 0.898
					},
					{
						"name": t`Specialty Psychiatric Hospitals`,
						"amount": 0.856
					},
					{
						"name": t`Canadian Blood Services`,
						"amount": 0.737
					},
					{
						"name": t`Renal Services`,
						"amount": 0.735
					},
					{
						"name": t`Other Health Programs`,
						"amount": 4.214
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