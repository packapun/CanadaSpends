"use client";

import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import { SankeyChart } from "./SankeyChart";
import { SankeyData } from "./SankeyChartD3";

// Import the Ontario data
import ontarioData from "../../../OntarioData/Ontario2024CompactSankey.json";

export function OntarioSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Transform the Ontario data to match the expected format
		// The Ontario data already has the right structure, just need to ensure it's typed correctly
		return {
			total: ontarioData.total,
			spending: ontarioData.spending,
			revenue: ontarioData.revenue,
			spending_data: {
				...ontarioData.spending_data,
				name: t`Spending`,
				id: 'spending_root',
				displayName: t`Spending`
			},
			revenue_data: {
				...ontarioData.revenue_data,
				name: t`Revenue`,
				id: 'revenue_root',
				displayName: t`Revenue`
			}
		} as SankeyData;
	}, [t])

	return (
		<SankeyChart data={data} />
	);
} 