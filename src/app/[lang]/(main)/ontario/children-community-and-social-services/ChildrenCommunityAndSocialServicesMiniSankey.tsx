"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import ministryData from "@/data/ministries/children-community-and-social-services";

export function ChildrenCommunityAndSocialServicesMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Use actual Children, Community and Social Services ministry data from TypeScript module
		return {
			total: ministryData.totalSpending,
			spending: ministryData.totalSpending,
			revenue: 0,
			spending_data: {
				name: t`Ontario Children, Community and Social Services`,
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
