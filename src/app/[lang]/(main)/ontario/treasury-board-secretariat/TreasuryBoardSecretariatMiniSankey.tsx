"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function TreasuryBoardSecretariatMiniSankey() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual Treasury Board Secretariat ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": 1.5, // Actual total from the Ontario data
			"spending_data": {
				"name": t`Ontario Treasury Board Secretariat`,
				"children": [
					{
						"name": t`Treasury Board Secretariat Operations`,
						"amount": 1.4202010929999993
					},
					{
						"name": t`Other Programs`,
						"amount": 0.08661784000000002
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