"use client";

import { useRef, useEffect } from "react";
import data from "./data.json";
import { SankeyChart } from "./SankeyChart";
import "./style.css";

interface SankeyNode {
  name: string;
  amount?: number;
  children?: SankeyNode[];
}

interface SankeyData {
  total: number;
  spending: number;
  revenue: number;
  spending_data: SankeyNode;
  revenue_data: SankeyNode;
}

function sortNodesByAmount(node: SankeyNode): SankeyNode {
  // If the node has children, sort them
  if (node.children && node.children.length > 0) {
    // First recursively sort each child's children (if any)
    node.children.forEach(child => sortNodesByAmount(child));
    
    // Then sort the children array by amount (descending)
    node.children.sort((a, b) => {
      // Calculate the amount for nodes that have children (sum of their children's amounts)
      const getAmount = (node: SankeyNode): number => {
        if (node.amount !== undefined) return node.amount;
        if (!node.children) return 0;
        return node.children.reduce((sum, child) => sum + getAmount(child), 0);
      };
      
      return getAmount(b) - getAmount(a); // Descending order
    });
  }
  
  return node;
}

const chartHeight = 800;

export function Sankey() {
	const revenue = useRef<SankeyChart>(null);
	const spending = useRef<SankeyChart>(null);

	useEffect(() => {
		if (!spending.current) {
			spending.current = new SankeyChart({
				height: chartHeight,
				container: "#spending-chart-root",
				data: JSON.parse(JSON.stringify(sortNodesByAmount(data.spending_data))),
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
				data: JSON.parse(JSON.stringify(sortNodesByAmount(data.revenue_data))),
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

		return () => {
			revenue.current = null;
			spending.current = null;

			const revenueEl = document.getElementById("revenue-chart-root");
			const spendingEl = document.getElementById("spending-chart-root");
			if (revenueEl) revenueEl.innerHTML = "";
			if (spendingEl) spendingEl.innerHTML = "";
		};
	}, []);

	return (
		<div className="w-full flex-grow flex overflow-hidden gap-x-2 pb-5 bg-[#202122]">
			<div id="revenue-chart-root" className="chart w-[40%]" />
			<div id="spending-chart-root" className="chart w-[60%]" />
		</div>
	);
}
