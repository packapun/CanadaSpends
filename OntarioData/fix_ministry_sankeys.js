const fs = require('fs');
const path = require('path');

// Read the summary to get all ministries
const summaryData = JSON.parse(fs.readFileSync('./ministries/_summary.json', 'utf8'));

// Ministries that already work correctly (manually created)
const workingMinistries = ['health', 'education'];

// Filter to get ministries that need fixes
const ministriesToFix = summaryData.ministries.filter(ministry => 
    !workingMinistries.includes(ministry.slug)
);

console.log(`Fixing Sankey components for ${ministriesToFix.length} ministries...`);

// Function to create slug-friendly component name
function createComponentName(slug) {
    return slug.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('') + 'MiniSankey';
}

// Function to clean and organize spending data
function cleanSpendingData(categories, ministryName) {
    // Group similar operations and clean up names
    const cleaned = [];
    let operationsTotal = 0;
    let otherTotal = 0;
    
    categories.forEach(cat => {
        if (cat.name === "Operations" || cat.name.includes("Operations")) {
            operationsTotal += cat.amount;
        } else if (cat.amount >= 0.1) { // Only include categories >= $100M
            cleaned.push({
                name: cat.name,
                amount: cat.amount
            });
        } else {
            otherTotal += cat.amount;
        }
    });
    
    // Add consolidated operations if significant
    if (operationsTotal >= 0.1) {
        cleaned.unshift({
            name: `${ministryName} Operations`,
            amount: operationsTotal
        });
    }
    
    // Add "Other" category if significant
    if (otherTotal >= 0.05) {
        cleaned.push({
            name: "Other Programs",
            amount: otherTotal
        });
    }
    
    // Sort by amount (descending) and take top 12
    return cleaned.sort((a, b) => b.amount - a.amount).slice(0, 12);
}

// Template for fixed MiniSankey component
function createFixedMiniSankeyTemplate(ministry, ministryData) {
    const componentName = createComponentName(ministry.slug);
    const cleanedCategories = cleanSpendingData(ministryData.categories, ministry.name);
    
    const childrenData = cleanedCategories.map(cat => `					{
						"name": t\`${cat.name}\`,
						"amount": ${cat.amount}
					}`).join(',\n');

    return `"use client";

import { SankeyChart } from "@/components/Sankey/SankeyChart";
import { SankeyData } from "@/components/Sankey/SankeyChartD3";
import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";

export function ${componentName}() {
	const { t } = useLingui()

	const data = useMemo(() => {
		// Actual ${ministry.name} ministry data from Ontario2024CompactSankey.json
		return JSON.parse(JSON.stringify({
			"spending": ${ministry.totalSpending.toFixed(1)}, // Actual total from the Ontario data
			"spending_data": {
				"name": t\`Ontario ${ministry.name}\`,
				"children": [
${childrenData}
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
}`;
}

// Fix all the broken Sankey components
let fixedCount = 0;

ministriesToFix.forEach(ministry => {
    try {
        // Read the detailed ministry data
        const ministryDataPath = `./ministries/${ministry.slug}.json`;
        const ministryData = JSON.parse(fs.readFileSync(ministryDataPath, 'utf8'));
        
        // Path to the Sankey component
        const componentName = createComponentName(ministry.slug);
        const sankeyPath = `../src/app/[lang]/(main)/ontario/${ministry.slug}/${componentName}.tsx`;
        
        // Create fixed MiniSankey component
        const sankeyContent = createFixedMiniSankeyTemplate(ministry, ministryData);
        fs.writeFileSync(sankeyPath, sankeyContent);
        
        console.log(`✓ Fixed ${ministry.name} Sankey component`);
        fixedCount++;
        
    } catch (error) {
        console.error(`✗ Failed to fix ${ministry.name}:`, error.message);
    }
});

console.log(`\n✅ Successfully fixed ${fixedCount} Sankey components!`);
console.log(`🔧 All components now use the correct structure with proper wrapper divs and cleaned data.`); 