"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function PublicAndBusinessServiceDeliveryMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Public and Business Service Delivery ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 1.0, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Public and Business Service Delivery`,
				"children": [
					{
						"name": t`Public and Business Service Delivery Operations`,
						"amount": 1.0203532069999999
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