"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import ministryData from "@/data/ministries/francophone-affairs-francophone-affairs";

export function FrancophoneAffairsFrancophoneAffairsMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Use actual Francophone Affairs → Francophone Affairs ministry data from TypeScript module
		return {
			total: ministryData.totalSpending,
			spending: ministryData.totalSpending,
			revenue: 0,
			spending_data: {
				name: t`Ontario Francophone Affairs → Francophone Affairs`,
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
