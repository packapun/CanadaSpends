"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import ministryData from "@/data/ministries/labour-immigration-training-and-skills-development";

export function LabourImmigrationTrainingAndSkillsDevelopmentMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Use actual Labour, Immigration, Training and Skills Development ministry data from TypeScript module
		return {
			total: ministryData.totalSpending,
			spending: ministryData.totalSpending,
			revenue: 0,
			spending_data: {
				name: t`Ontario Labour, Immigration, Training and Skills Development`,
				amount: ministryData.totalSpending,
				children: [...ministryData.spending_data.children]
			},
			revenue_data: {
				name: t`Revenue`,
				amount: 0,
				children: []
			}
		};
	}, [t])

	return (
		<div className='sankey-chart-container spending-only'>
			<SankeyChart data={data as SankeyData} />
		</div>
	);
}
