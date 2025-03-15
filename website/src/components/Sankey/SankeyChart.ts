// @ts-nocheck
import "d3-transition";

import { select } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { area, curveBumpX } from "d3-shape";
import { cumsum, pairs, rollups, sum } from "d3-array";
import { hierarchy } from "d3-hierarchy";
import { format } from "d3-format";

const numberFormatter = format("$,.2s");

export class SankeyChart {
	constructor(props) {
		// Default configuration parameters for the chart
		const params = Object.assign(
			{
				container: document.body,
				width: 0, // calculated dynamically if zero
				height: 600,
				margin: {
					top: 50,
					right: 1,
					bottom: 0,
					left: 1,
				},
				colors: {
					background: "#202122",
					primary: "#E3007D",
				},
				shortBlockHeight: 16,
				data: null,
				amountDomain: [0, 100],
				difference: 0,
				differenceLabel: "Deficit",
				amountScalingFactor: 1e9,
			},
			props,
		);

		this.params = params;
		this.container = select(params.container || "body").style(
			"position",
			"relative",
		);

		this.link = area()
			.x((d) => d.x)
			.y0((d) => d.y0)
			.y1((d) => d.y1)
			.curve(curveBumpX);

		this.setChartDimensions();
		this.renderContainers();

		if (this.params.data) {
			this.transformData();
			this.draw();
			this.drawLinks();

			// Handle resize
			const resizeObserver = new ResizeObserver(() => {
				this.drawLinks();
				if (this.highlightedNode) {
					this.highlightNode(this.highlightedNode);
				}
			});

			resizeObserver.observe(this.container.node());
		}
	}

	// Calculates dimensions and sets up the scaling function
	setChartDimensions() {
		let { width, height, margin } = this.params;

		if (!width) {
			const w = this.container.node().getBoundingClientRect().width;
			if (w) {
				width = w;
				this.params.width = w;
			}
		}

		this.chartWidth = width - margin.left - margin.right;
		this.chartHeight = height - margin.top - margin.bottom;

		this.scale = scaleLinear()
			.domain(this.params.amountDomain)
			.range([0, this.chartHeight * 0.7]);
	}

	// Creates the main SVG and DIV containers for the chart
	renderContainers() {
		const { margin } = this.params;

		this.rootDiv = this.container
			.append("div")
			.attr("class", "sankey-chart-outer")
			.style("height", `${this.params.height}px`)
			.style("padding-left", `${margin.left}px`)
			.style("padding-right", `${margin.right}px`);

		this.sankeyDiv = this.rootDiv
			.append("div")
			.attr("class", "sankey-chart")
			.attr("data-direction", this.params.direction);

		this.sankeySvg = this.container
			.append("svg")
			.attr("class", "sankey-chart-svg")
			.style("position", "absolute")
			.style("top", "0")
			.style("left", "0")
			.style("width", "100%")
			.style("height", "100%");
	}

	// Main drawing function that creates the blocks and labels
	draw() {
		// Create columns
		const columns = this.sankeyDiv
			.selectAll(".column")
			.data(this.columnsData)
			.join("div")
			.attr("class", "column")
			.attr("data-level", (d, i) => i)
			.classed("narrow", (d, i) => i === 0)
			.on("scroll", () => {
				this.drawLinks();
				if (this.highlightedNode) {
					this.highlightNode(this.highlightedNode);
				}
			});

		const groups = columns
			.selectAll(".group")
			.data((d) => d.groups)
			.join("div")
			.attr("class", "group");

		groups
			.selectAll(".spacer")
			.data((d, i) => (d.index === 0 ? [d] : []))
			.join("div")
			.attr("class", "spacer")
			.style("height", () => {
				return this.params.margin.top + "px";
			});

		// Create blocks within each group
		const blocks = groups
			.selectAll(".block")
			.data((d) => d.blocks)
			.join("div")
			.attr("class", "block")
			.style("position", "relative")
			.classed("fake", (d) => d.fake)
			.classed(
				"with-background",
				(d) => this.scale(d.value) < this.params.shortBlockHeight,
			)
			.classed(
				"short",
				(d) => this.scale(d.value) < this.params.shortBlockHeight * 3,
			)
			.classed("difference", (d) => d.isDifference)
			.style("height", (d) => this.scale(d.value) + "px")
			.style("background-color", (d) => this.params.colors.primary)
			.style("opacity", (d) => (d.fake ? 0 : 1))
			.style("margin-top", (d, i) => {
				if (d.groupIndex === 0 && i === 0) {
					return d.depth * 10 + "px";
				}
				return 0;
			})
			.on("mouseover", (e, d) => {
				this.highlightNode(d);
			})
			.on("mouseout", () => {
				this.highlightNode(null);
			});

		blocks
			.selectAll(".label")
			.data((d) => [d].filter((d) => !d.fake))
			.join("p")
			.attr("class", "label")
			.html(
				(d) => `
					<div class="label-amount">${this.getNumber(d.value)}</div>
					<div class="label-name" title="${d.name}">
						${
					d.link ? `<a href="${d.link}" target="_blank">${d.name}</a>` : d.name
				}
					</div>
				`,
			);
	}

	// Highlights selected node and its connections
	highlightNode(node) {
		this.highlightedNode = node;

		if (!node) {
			// Reset all highlights when no node is selected
			this.sankeyDiv
				.selectAll(".block")
				.classed("highlight", false)
				.classed("current-node", false);
			this.sankeySvg.selectAll(".link").classed("highlight", false);
			this.sankeySvg.selectAll(".highlight-group").remove();
			// Automatic scroll into view
			if (this.timerId) {
				clearTimeout(this.timerId);
				this.timerId = null;
			}
			return;
		}

		// Just in case
		if (node.isDifference || node.fake) {
			return;
		}

		// Find all connected nodes and calculate paths
		const nodesToHighlight = Array.from(
			new Set([...node.pathToRoot, ...node.descendants]),
		);
		const currentNodeHeight = this.scale(node.value);

		const path = pairs(node.pathToRoot)
			.map((d) => {
				return this.linksMap.get(`${d[1]}->${d[0]}`);
			})
			.map((d, i, arr) => {
				const cummulativeSum = sum(
					arr.slice(0, i),
					(d) => d.target.cumulativeHeight,
				);
				const cummulativeSumPrevious = sum(
					arr.slice(0, i - 1),
					(d) => d.target.cumulativeHeight,
				);

				const sourceY = i
					? d.lineCoords[0].y0 + cummulativeSum
					: d.lineCoords[0].y0;

				const targetY = i
					? arr[i - 1].lineCoords[0].y0 + cummulativeSumPrevious
					: d.lineCoords[1].y0;

				return {
					id: d.id,
					rect: {
						x: d.source.x,
						y: sourceY,
						width: d.source.width,
						height: currentNodeHeight,
					},
					lineCoords: [
						{
							x: d.lineCoords[0].x,
							y0: sourceY,
							y1: sourceY + currentNodeHeight,
						},
						{
							x: d.lineCoords[1].x,
							y0: targetY,
							y1: targetY + currentNodeHeight,
						},
					],
				};
			});

		this.sankeySvg.selectAll(".link").classed("highlight", (x) => {
			return (
				path.some((d) => d.id === x.id) ||
				nodesToHighlight.includes(x.target.name)
			);
		});

		let highlightedNodeElements = [];

		this.sankeyDiv
			.selectAll(".block:not(.fake)")
			.classed("highlight", function (x) {
				if (nodesToHighlight.includes(x.name)) {
					highlightedNodeElements.push(this);
					return true;
				}
				return false;
			})
			.classed("current-node", (x) => {
				return x.name === node.name;
			});

		this.drawHighlightedPath(
			path.map((d) => d.rect),
			path.map((d) => d.lineCoords),
		);

		// Automatic scroll into view
		if (this.timerId) {
			clearTimeout(this.timerId);
		}

		this.timerId = setTimeout(() => {
			highlightedNodeElements.forEach((element) => {
				// Check if element is fully visible in viewport
				const rect = element.getBoundingClientRect();
				const parentRect = element.closest(".column").getBoundingClientRect();

				const isFullyVisible = rect.top >= parentRect.top &&
					rect.bottom <= parentRect.bottom;

				// Only scroll if element is not fully visible
				if (!isFullyVisible) {
					element.scrollIntoView({ behavior: "smooth", block: "center" });
				}
			});
		}, 1000);
	}

	getRelativePosition(element, parent) {
		const childPos = element.getBoundingClientRect();
		const parentPos = parent.getBoundingClientRect();

		return {
			y: childPos.top - parentPos.top,
			x: childPos.left - parentPos.left,
			width: childPos.width,
			height: childPos.height,
		};
	}

	// Draws the connecting lines between blocks
	drawHighlightedPath(nodes, links) {
		// Create container group
		const highlightGroup = this.sankeySvg
			.selectAll("g.highlight-group")
			.data(["highlight-group"])
			.join("g")
			.attr("class", "highlight-group");

		// Add rectangles for nodes
		highlightGroup
			.selectAll("rect.highlight-box")
			.data(nodes)
			.join("rect")
			.attr("class", "highlight-box")
			.attr("x", (d) => d.x)
			.attr("y", (d) => d.y)
			.attr("width", (d) => d.width)
			.attr("height", (d) => d.height);

		// Add paths for links
		highlightGroup
			.selectAll("path.highlight-link")
			.data(links)
			.join("path")
			.attr("class", "highlight-link")
			.attr("d", this.link);
	}

	// Draws the connecting lines between blocks
	drawLinks() {
		// Calculate positions of all blocks relative to container
		const coords = [];
		const getRelativePosition = this.getRelativePosition;
		const parent = this.container.node();

		this.sankeyDiv.selectAll(".block").each(function (d) {
			if (d.fake || d.isDifference) return;

			const bound = getRelativePosition(this, parent);
			coords.push({
				name: d.target.name,
				x: bound.x,
				y: bound.y,
				width: bound.width,
				height: bound.height,
				groupIndex: d.groupIndex,
				columnIndex: d.columnIndex,
			});
		});

		const coordsGrouped = rollups(
			coords,
			(arr) => {
				const cumulativeHeights = cumsum(arr, (d) => d.height);
				const newArr = arr.map((d, i) => {
					return {
						...d,
						cumulativeHeight: i ? cumulativeHeights[i - 1] : 0,
					};
				});
				return newArr;
			},
			(d) => d.columnIndex,
			(d) => d.groupIndex,
		).flatMap((d) => {
			return d[1].flatMap((d) => d[1]);
		});

		const coordsLookup = new Map(coordsGrouped.map((d) => [d.name, d]));
		const isFlipped = this.params.direction === "right-to-left";

		const data = this.linksData.map((d) => {
			const source = coordsLookup.get(d.source.data.name);
			const target = coordsLookup.get(d.target.data.name);

			return {
				id: `${d.source.data.name}->${d.target.data.name}`,
				source: {
					name: d.source.data.name,
					x: source.x,
					y: source.y,
					width: source.width,
					height: source.height,
					cumulativeHeight: source.cumulativeHeight,
				},
				target: {
					name: d.target.data.name,
					x: target.x,
					y: target.y,
					width: target.width,
					height: target.height,
					cumulativeHeight: target.cumulativeHeight,
				},
				lineCoords: [
					{
						x: isFlipped ? source.x : source.x + source.width,
						y0: source.y + target.cumulativeHeight,
						y1: source.y + target.cumulativeHeight + target.height,
					},
					{
						x: isFlipped ? target.x + target.width : target.x,
						y0: target.y,
						y1: target.y + target.height,
					},
				],
			};
		});

		this.sankeySvg
			.selectAll(".link")
			.data(data)
			.join("path")
			.attr("class", "link")
			.attr("d", (d) => this.link(d.lineCoords))
			.attr("fill", this.params.colors.primary)
			.style("opacity", 0.5);

		this.linksMap = new Map(data.map((d) => [d.id, d]));
	}

	// Transforms hierarchical data into format needed for visualization
	transformData() {
		// Create hierarchy from input data
		const root = hierarchy(this.params.data).sum((d) => {
			return d.children ? 0 : d.amount;
		});

		console.log(`Total of ${root.data.name}: ${root.value}`);

		const links = root.links();

		// Calculate paths to root for each node
		const maxDepth = root.height;

		root.each((node) => {
			node.data.value = node.value;

			if (node.depth > 0) {
				const pathToRoot = node.path(root);
				node.data.pathToRoot = pathToRoot.map((d) => d.data.name);
			} else {
				node.data.pathToRoot = [];
			}

			node.data.descendants = node.descendants().map((d) => d.data.name);

			if (node.depth < maxDepth && !node.data.children) {
				this.fillLink(node.data, node.depth, maxDepth);
			}
		});

		const nodes = hierarchy(this.params.data).descendants();

		// Organize nodes into columns and groups
		const columns = rollups(
			nodes,
			(arr) => {
				return arr.map((d) => {
					return {
						source: d.parent?.data,
						target: d.data,
						depth: d.depth,
						...d.data,
					};
				});
			},
			(d) => d.depth,
			(d) => d.parent?.data?.name || "Root",
		).map((d, i) => {
			const groups = d[1].map((x, j) => {
				return {
					index: j,
					blocks: x[1].map((x, ind) => {
						x.groupIndex = j;
						return {
							...x,
							index: ind,
							groupIndex: j,
							columnIndex: i,
						};
					}),
				};
			});

			return {
				index: i,
				column: `column-${d[0]}`,
				groups: groups,
			};
		});

		// Add difference block if specified
		if (this.params.difference > 0) {
			columns[0].groups[0].blocks.push({
				index: columns[0].groups[0].blocks.length,
				amount: this.params.difference,
				value: this.params.difference,
				name: this.params.differenceLabel,
				isDifference: true,
				groupIndex: 0,
				columnIndex: 0,
				depth: 0,
				source: null,
				target: null,
				link: null,
			});
		}
		this.columnsData = columns;
		this.linksData = links;
	}

	fillLink(node, level, maxLevel) {
		if (level === maxLevel) {
			return node;
		}
		node.children = [
			this.fillLink({ ...node, fake: true }, level + 1, maxLevel),
		];
		return node;
	}

	getNumber(amount) {
		return numberFormatter(amount * this.params.amountScalingFactor).replace(
			"G",
			"B",
		);
	}
}
