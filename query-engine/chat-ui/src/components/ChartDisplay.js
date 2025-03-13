import React from 'react';
import Plot from 'react-plotly.js';

/**
 * ChartDisplay component renders Plotly.js charts based on configurations received from the API
 * 
 * @param {Object} props - Component props
 * @param {Array} props.charts - Array of chart configurations from the API
 */
const ChartDisplay = ({ charts }) => {
  // If no charts or empty array, don't render anything
  if (!charts || charts.length === 0) {
    return null;
  }

  // Normalize chart data to handle various potential structures coming from the API
  const normalizeChartData = (chartConfig) => {
    try {
      if (!chartConfig) return null;

      // Fix for missing layout
      const layout = chartConfig.layout || {};
      
      // Handle case where data is nested inside a 'data' property
      let chartData = chartConfig.data;
      if (chartData && typeof chartData === 'object' && !Array.isArray(chartData) && chartData.data) {
        console.log('Fixing nested data structure in chart data');
        chartData = chartData.data;
      }

      // Ensure chartData is an array
      if (!Array.isArray(chartData)) {
        console.error('Chart data is not an array and cannot be normalized:', chartData);
        return null;
      }

      // Create a normalized chart configuration
      return {
        ...chartConfig,
        data: chartData,
        layout: {
          ...layout,
          autosize: true,
          margin: { l: 50, r: 20, b: 50, t: 50, pad: 0 },
          title: chartConfig.title || '',
          xaxis: {
            ...(layout.xaxis || {}),
            title: chartConfig.x_axis_label || ''
          },
          yaxis: {
            ...(layout.yaxis || {}),
            title: chartConfig.y_axis_label || ''
          }
        }
      };
    } catch (error) {
      console.error('Error normalizing chart data:', error);
      return null;
    }
  };

  return (
    <div className="charts-container">
      {charts.map((chart, index) => {
        // Normalize and validate chart configuration
        const normalizedChart = normalizeChartData(chart);
        
        // Skip invalid charts
        if (!normalizedChart) {
          console.error('Invalid chart configuration:', chart);
          return null;
        }

        return (
          <div key={index} className="chart-wrapper">
            <Plot
              data={normalizedChart.data}
              layout={normalizedChart.layout}
              useResizeHandler={true}
              style={{ width: '100%', height: '400px' }}
              config={{
                displayModeBar: true,
                responsive: true,
                displaylogo: false,
                modeBarButtonsToRemove: [
                  'sendDataToCloud',
                  'editInChartStudio',
                  'select2d',
                  'lasso2d'
                ]
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChartDisplay; 