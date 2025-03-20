import { format } from "d3-format";
import { SankeyNode } from "./SankeyChartD3";

const numberFormatter = format("$,.2s");

export const formatNumber = (amount: number, scalingFactor = 1e9) => {
	return numberFormatter(amount * scalingFactor).replace("G", "B");
};

export function sortNodesByAmount(node: SankeyNode): SankeyNode {
	// If the node has children, sort them
	if (node.children && node.children.length > 0) {
		// First recursively sort each child's children (if any)
		node.children.forEach((child) => sortNodesByAmount(child));

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
