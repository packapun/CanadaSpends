"use client";

import { useRef, useEffect } from "react";
import data from "./data.json";
import { SankeyChart } from "./SankeyChart";
import "./style.css";

const chartHeight = 800;

export function Sankey() {
	const revenue = useRef<SankeyChart>(null);
	const spending = useRef<SankeyChart>(null);

	useEffect(() => {
		if (!spending.current) {
			spending.current = new SankeyChart({
				height: chartHeight,
				container: "#spending-chart-root",
				// force deep copy
				data: JSON.parse(JSON.stringify(data.spending_data)),
				direction: "left-to-right",
				amountDomain: [0, data.total],
				difference: data.total - data.spending,
				differenceLabel: "Surplus",
				amountScalingFactor: 1e9,
			});
		}

		if (!revenue.current) {
			revenue.current = new SankeyChart({
				height: chartHeight,
				container: "#revenue-chart-root",
				// force deep copy
				data: JSON.parse(JSON.stringify(data.revenue_data)),
				colors: {
					primary: "#249EDC",
					background: "#202122",
				},
				direction: "right-to-left",
				amountDomain: [0, data.total],
				difference: data.total - data.revenue,
				differenceLabel: "Deficit",
				amountScalingFactor: 1e9,
			});
		}
	}, []);

	return (
		<div className="w-full flex-grow flex overflow-hidden gap-x-2 pb-5 bg-[#202122]">
			<div id="revenue-chart-root" className="chart w-1/2" />
			<div id="spending-chart-root" className="chart w-1/2" />
		</div>
	);
}
