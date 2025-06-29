const fs = require('fs');
const path = require('path');

// Read all ministry data files
const ministriesDir = './ministries';
const ministryFiles = fs.readdirSync(ministriesDir)
  .filter(file => file.endsWith('.json') && file !== '_summary.json');

console.log(`Updating ${ministryFiles.length} ministry MiniSankey components to use TypeScript modules`);

// Function to convert slug to component name
function slugToComponentName(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'MiniSankey';
}

// Generate component for each ministry
ministryFiles.forEach(file => {
  const slug = file.replace('.json', '');
  const ministryData = JSON.parse(fs.readFileSync(path.join(ministriesDir, file), 'utf8'));
  const componentName = slugToComponentName(slug);
  const ministryTitle = ministryData.name;
  
  console.log(`Updating ${componentName} for ${ministryTitle}`);

  const componentContent = `"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import ministryData from "@/data/ministries/${slug}";

export function ${componentName}() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Use actual ${ministryTitle} ministry data from TypeScript module
		return {
			spending: ministryData.totalSpending,
			spending_data: {
				name: t\`Ontario ${ministryTitle}\`,
				children: ministryData.spending_data.children
			},
			revenue_data: {}
		};
	}, [t])

	return (
		<div className='sankey-chart-container spending-only'>
			<SankeyChart data={data as SankeyData} />
		</div>
	);
}
`;

  // Write the component file
  const componentPath = `../src/app/[lang]/(main)/ontario/${slug}/${componentName}.tsx`;
  
  try {
    fs.writeFileSync(componentPath, componentContent);
    console.log(`✅ Updated ${componentPath}`);
  } catch (error) {
    console.error(`❌ Error writing ${componentPath}:`, error.message);
  }
});

console.log('\n🎉 Ministry MiniSankey TypeScript update complete!'); 