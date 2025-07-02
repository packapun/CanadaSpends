"use client";

import { ExternalLink } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { OntarioSankey } from "@/components/Sankey/OntarioSankey";

export default function OntarioSpendingFullScreen() {
	return (
		<div className="min-h-screen bg-white">
			<div className='sankey-chart-container relative overflow-hidden min-h-screen min-w-[1280px]'>
				<NoSSR>
					<OntarioSankey />
				</NoSSR>
				<div className="absolute bottom-3 left-6">
					<ExternalLink className="text-xs text-gray-400" href="https://www.ontario.ca/page/public-accounts-ontario-2023-24">Source</ExternalLink>
				</div>
			</div>
		</div>
	);
} 