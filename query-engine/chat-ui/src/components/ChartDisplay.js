import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

/**
 * ChartDisplay component renders D3.js charts based on configurations received from the API
 * 
 * @param {Object} props - Component props
 * @param {Array} props.charts - Array of chart configurations from the API
 */
const ChartDisplay = ({ charts }) => {
  // If no charts or empty array, don't render anything
  if (!charts || charts.length === 0) {
    return null;
  }

  return (
    <div className="charts-container">
      {charts.map((chart, index) => (
        <D3Chart key={index} chartConfig={chart} />
      ))}
    </div>
  );
};

/**
 * D3Chart component that renders a specific chart using D3.js
 */
const D3Chart = ({ chartConfig }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartConfig || !chartRef.current) return;

    // Clear any existing chart
    d3.select(chartRef.current).selectAll('*').remove();

    // Normalize chart data structure
    const chartData = normalizeChartData(chartConfig);
    if (!chartData) return;

    // Create the appropriate chart based on type
    switch (chartConfig.chart_type?.toLowerCase()) {
      case 'bar':
        createBarChart(chartRef.current, chartData);
        break;
      case 'line':
        createLineChart(chartRef.current, chartData);
        break;
      case 'pie':
        createPieChart(chartRef.current, chartData);
        break;
      default:
        console.error(`Unsupported chart type: ${chartConfig.chart_type}`);
        createBarChart(chartRef.current, chartData); // Default to bar chart
    }
  }, [chartConfig]);

  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">{chartConfig.title}</h3>
      <div className="d3-chart" ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

/**
 * Normalize chart data to handle various potential structures
 */
const normalizeChartData = (chartConfig) => {
  try {
    if (!chartConfig) return null;

    // Handle case where data is nested inside a 'data' property
    let chartData = chartConfig.data;
    if (chartData && typeof chartData === 'object' && !Array.isArray(chartData) && chartData.data) {
      console.log('Fixing nested data structure in chart data');
      chartData = chartData.data;
    }

    // For D3.js, data should be an object with x and y arrays (or labels and values for pie)
    if (!chartData || typeof chartData !== 'object') {
      console.error('Chart data is missing or not an object:', chartData);
      return null;
    }
    
    // Check for required data arrays based on chart type
    if (chartConfig.chart_type?.toLowerCase() === 'pie') {
      if (!chartData.labels && !chartData.x) {
        console.error('Pie chart data is missing labels/x array');
        return null;
      }
      if (!chartData.values && !chartData.y) {
        console.error('Pie chart data is missing values/y array');
        return null;
      }
    } else {
      if (!chartData.x) {
        console.error('Chart data is missing x array');
        return null;
      }
      if (!chartData.y) {
        console.error('Chart data is missing y array');
        return null;
      }
    }

    return {
      ...chartConfig,
      data: chartData,
      title: chartConfig.title || '',
      xAxisLabel: chartConfig.x_axis_label || '',
      yAxisLabel: chartConfig.y_axis_label || ''
    };
  } catch (error) {
    console.error('Error normalizing chart data:', error);
    return null;
  }
};

/**
 * Create a bar chart using D3.js
 */
const createBarChart = (container, chartData) => {
  const { data, xAxisLabel, yAxisLabel } = chartData;
  
  // Extract x and y values from the data
  const xValues = data.x || [];
  const yValues = data.y || [];
  
  if (xValues.length === 0 || yValues.length === 0) {
    console.error('Bar chart data is missing x or y values');
    return;
  }

  // Chart dimensions
  const width = container.clientWidth;
  const height = container.clientHeight;
  const margin = { top: 50, right: 30, bottom: 80, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create SVG element
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Create chart group
  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Create x scale
  const xScale = d3.scaleBand()
    .domain(xValues)
    .range([0, innerWidth])
    .padding(0.2);

  // Create y scale
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(yValues) * 1.1]) // Add 10% padding
    .range([innerHeight, 0]);

  // Create and append x axis
  chart.append('g')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em');

  // Create and append y axis
  chart.append('g')
    .call(d3.axisLeft(yScale));

  // Create and append bars
  chart.selectAll('.bar')
    .data(xValues)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d))
    .attr('y', (d, i) => yScale(yValues[i]))
    .attr('width', xScale.bandwidth())
    .attr('height', (d, i) => innerHeight - yScale(yValues[i]))
    .attr('fill', 'steelblue');

  // Add x axis label
  svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('x', width / 2)
    .attr('y', height - 10)
    .style('text-anchor', 'middle')
    .text(xAxisLabel);

  // Add y axis label
  svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', 20)
    .style('text-anchor', 'middle')
    .text(yAxisLabel);
};

/**
 * Create a line chart using D3.js
 */
const createLineChart = (container, chartData) => {
  const { data, xAxisLabel, yAxisLabel } = chartData;
  
  // Extract x and y values from the data
  const xValues = data.x || [];
  const yValues = data.y || [];
  
  if (xValues.length === 0 || yValues.length === 0) {
    console.error('Line chart data is missing x or y values');
    return;
  }

  // Create data points array with x and y values
  const points = xValues.map((x, i) => ({ x, y: yValues[i] }));

  // Chart dimensions
  const width = container.clientWidth;
  const height = container.clientHeight;
  const margin = { top: 50, right: 30, bottom: 80, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create SVG element
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Create chart group
  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Create x scale - check if values are dates
  let xScale;
  if (typeof xValues[0] === 'string' && !isNaN(Date.parse(xValues[0]))) {
    xScale = d3.scaleTime()
      .domain(d3.extent(points, d => new Date(d.x)))
      .range([0, innerWidth]);
  } else if (typeof xValues[0] === 'number') {
    xScale = d3.scaleLinear()
      .domain(d3.extent(xValues))
      .range([0, innerWidth]);
  } else {
    xScale = d3.scalePoint()
      .domain(xValues)
      .range([0, innerWidth])
      .padding(0.5);
  }

  // Create y scale
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(yValues) * 1.1]) // Add 10% padding
    .range([innerHeight, 0]);

  // Create line generator
  const line = d3.line()
    .x((d, i) => xScale(typeof d.x === 'string' && !isNaN(Date.parse(d.x)) ? new Date(d.x) : d.x))
    .y(d => yScale(d.y));

  // Create and append x axis
  chart.append('g')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em');

  // Create and append y axis
  chart.append('g')
    .call(d3.axisLeft(yScale));

  // Create and append line
  chart.append('path')
    .datum(points)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('d', line);

  // Create and append dots
  chart.selectAll('.dot')
    .data(points)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', (d, i) => xScale(typeof d.x === 'string' && !isNaN(Date.parse(d.x)) ? new Date(d.x) : d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', 4)
    .attr('fill', 'steelblue');

  // Add x axis label
  svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('x', width / 2)
    .attr('y', height - 10)
    .style('text-anchor', 'middle')
    .text(xAxisLabel);

  // Add y axis label
  svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', 20)
    .style('text-anchor', 'middle')
    .text(yAxisLabel);
};

/**
 * Create a pie chart using D3.js
 */
const createPieChart = (container, chartData) => {
  const { data } = chartData;
  
  // Extract values and labels
  const values = data.values || data.y || [];
  const labels = data.labels || data.x || [];
  
  if (values.length === 0 || labels.length === 0) {
    console.error('Pie chart data is missing values or labels');
    return;
  }

  // Chart dimensions
  const width = container.clientWidth;
  const height = container.clientHeight;
  const margin = 40;
  const radius = Math.min(width, height) / 2 - margin;

  // Create SVG element
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  // Color scale
  const color = d3.scaleOrdinal()
    .domain(labels)
    .range(d3.schemeCategory10);

  // Create pie chart data
  const pie = d3.pie()
    .value(d => d)
    .sort(null); // Don't sort, use the order provided

  const data_ready = pie(values);

  // Create arc generator
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  // Create smaller arc for labels
  const outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  // Create and append pie slices
  svg.selectAll('allSlices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => color(labels[i]))
    .attr('stroke', 'white')
    .style('stroke-width', '2px');

  // Add labels
  svg.selectAll('allLabels')
    .data(data_ready)
    .enter()
    .append('text')
    .text((d, i) => labels[i])
    .attr('transform', d => {
      const pos = outerArc.centroid(d);
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      pos[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
      return `translate(${pos})`;
    })
    .style('text-anchor', d => {
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      return (midangle < Math.PI ? 'start' : 'end');
    })
    .style('font-size', '12px');

  // Add polylines between slices and labels
  svg.selectAll('allPolylines')
    .data(data_ready)
    .enter()
    .append('polyline')
    .attr('points', d => {
      const posA = arc.centroid(d);
      const posB = outerArc.centroid(d);
      const posC = outerArc.centroid(d);
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      posC[0] = radius * 0.92 * (midangle < Math.PI ? 1 : -1);
      return [posA, posB, posC];
    })
    .style('fill', 'none')
    .style('stroke', 'black')
    .style('opacity', 0.5);
};

export default ChartDisplay; 