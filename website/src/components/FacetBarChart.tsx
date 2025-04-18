'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Tooltip,
  Text,
  LabelList
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SearchResult } from '../types/search';
import { formatCurrency } from '../utils/csvUtils'; // Keep for Tooltip
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select';
import { Loader2 } from 'lucide-react'; // Import loader

// Define the expanded attribute type
type ChartableAttribute = 'payer' | 'recipient' | 'province' | 'country';

// Define AggregatedData structure (matching Search.tsx)
type AggregatedData = { name: string; value: number };

// Export the props interface
export interface FacetBarChartProps {
  chartAttribute: ChartableAttribute;
  setChartAttribute: (value: ChartableAttribute) => void;
  data: AggregatedData[];
  isLoading: boolean;
  limit?: number;
}

// --- Utility Function for Compact Number Formatting ---
function formatCompactNumber(value: number): string {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`; // Basic format for smaller numbers
}

// --- Custom Y-axis tick with wrapping --- 
const CustomYAxisTick = (props: any) => {
  const { x, y, payload, width = 150 } = props; // Default width if not provided
  const value = payload.value;
  const charactersPerLine = Math.floor(width / 7); // Estimate chars per line (adjust font size/char width estimate)
  const lines = [];
  let currentLine = '';

  // Basic word wrapping logic
  value.split(' ').forEach((word: string) => {
    if ((currentLine + word).length > charactersPerLine && currentLine.length > 0) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  lines.push(currentLine.trim()); // Add the last line

  return (
    <g transform={`translate(${x},${y})`}> 
      <text textAnchor="end" fill="#666" fontSize={12}>
        {lines.map((line, index) => (
          <tspan key={index} x={0} dy={index === 0 ? 0 : '1.1em'}> 
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

// Formatter for the bar labels using compact format
const renderCustomizedLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const formattedValue = formatCompactNumber(value);
  const labelX = x + width + 5; // Position label slightly after the bar
  const labelY = y + height / 2; // Center vertically

  return (
    <Text x={labelX} y={labelY} dy={5} fill="#333" textAnchor="start" fontSize={12}>
      {formattedValue}
    </Text>
  );
};

export function FacetBarChart({ chartAttribute, setChartAttribute, data, isLoading, limit = 10 }: FacetBarChartProps) {
  // Use the passed-in data directly
  const chartData = data; // Or potentially slice here if limit applies to display: data.slice(0, limit);

  // Handle case where data might be empty even if not loading
  if (!isLoading && chartData.length === 0) {
    // Optionally show a message like "No data for this category" or just return null
    // Return null for now if no data and not loading
    return null;
  }

  const handleChartAttributeChange = (value: string) => {
    setChartAttribute(value as ChartableAttribute);
  };

  // Dynamically create title based on attribute
  const getChartTitleSegment = (attr: ChartableAttribute): string => {
    switch (attr) {
      case 'payer': return 'Department';
      case 'recipient': return 'Recipient';
      case 'province': return 'Province';
      case 'country': return 'Country';
      default: return 'Category';
    }
  };

  return (
    <Card className="mt-6 mb-8 relative"> {/* Add relative positioning for loader */}
      <CardHeader className="flex flex-row items-center gap-4 border-b pb-4 mb-4">
        <span className="font-semibold">Results by</span>
        <div className="flex items-center">
           <Select value={chartAttribute} onValueChange={handleChartAttributeChange}>
             <SelectTrigger className="w-[180px] h-9 text-sm border shadow-sm">
               <SelectValue placeholder="Category" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="payer">Department</SelectItem>
               <SelectItem value="recipient">Recipient</SelectItem>
               <SelectItem value="province">Province</SelectItem>
               <SelectItem value="country">Country</SelectItem>
             </SelectContent>
           </Select>
         </div>
      </CardHeader>
      <CardContent>
        {/* Loading Overlay */} 
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        )}
        {/* Chart Container */} 
        <div style={{ opacity: isLoading ? 0.5 : 1 }}> {/* Optional: dim chart when loading */} 
          <ResponsiveContainer width="100%" height={60 + chartData.length * 50}>
            <BarChart
              data={chartData} // Use data prop
              layout="vertical"
              margin={{ top: 5, right: 80, left: 20, bottom: 5 }}
            >
              <YAxis
                type="category"
                dataKey="name"
                width={180}
                interval={0}
                tick={<CustomYAxisTick width={180} />}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), getChartTitleSegment(chartAttribute) + ' Total']}
                cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}
              />
              <Bar dataKey="value" fill="#0ea5e9" barSize={25}>
                 <LabelList dataKey="value" position="right" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 