"use client";

import { BarChart } from "@/components/BarChart";
import { ExternalLink, H1, H2, InternalLink, Intro, P, Page, PageContent, Section } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { OntarioMinistryList } from "@/components/OntarioMinistryList";
import { OntarioSankey } from "@/components/Sankey/OntarioSankey";
import { Trans, useLingui } from "@lingui/react/macro";

const StatBox = ({ title, value, description }: { title: React.ReactNode, value: string, description: React.ReactNode }) => (
	<div className="flex flex-col mr-8 mb-8">
		<div className="text-sm text-gray-600 mb-1">{title}</div>
		<div className="text-3xl font-bold mb-1">{value}</div>
		<div className="text-sm text-gray-600">{description}</div>
	</div>
);

export default function OntarioSpending() {
	const { t } = useLingui()
	return (
		<Page>
			<PageContent>
				<Section>
					<H1><Trans>Ontario Government Spending</Trans></H1>
					<Intro>
						<Trans>Get data-driven insights into how Ontario's provincial revenue and spending affect Ontario residents and programs.</Trans>
					</Intro>
				</Section>
				<Section>
					<H2><Trans>FY 2024 Ontario Government Revenue and Spending</Trans></H2>
					<P>
						<Trans>Explore Ontario's revenue and spending categories or filter by ministry for deeper insights.</Trans>
					</P>
				</Section>
			</PageContent>
			<div className='sankey-chart-container relative overflow-hidden sm:(mr-0 ml-0) md:(min-h-[776px] min-w-[1280px] w-screen -ml-[50vw] -mr-[50vw] left-1/2 right-1/2)'>
				<NoSSR>
					<OntarioSankey />
				</NoSSR>
				<div className="absolute bottom-3 left-6"><ExternalLink className="text-xs text-gray-400" href="https://www.ontario.ca/page/public-accounts-ontario-2023-24">Source</ExternalLink></div>
				<div className="absolute top-0 left-0 w-[100vw] h-full  backdrop-blur-sm z-10 text-white md:hidden flex items-center justify-center">
					<ExternalLink
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						href="/ontario-spending-full-screen"
					>
						<Trans>View this chart in full screen</Trans>
					</ExternalLink>
				</div>
			</div>
			<PageContent>
				<Section>
					<H2><Trans>Ontario Government Workforce</Trans></H2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<StatBox
							title={t`Public Service Employees`}
							value="73,000"
							description={t`Estimated provincial public service`}
						/>

						<StatBox
							title={t`Ministries + Agencies`}
							value="24"
							description={t`Provincial organizations`}
						/>

						<StatBox
							title={t`Total Provincial Spending`}
							value="$200.6B"
							description={t`Annual budget 2024`}
						/>

						<div>
							<h3 className="font-medium mb-2"><Trans>Ontario Public Service</Trans></h3>
							<p className="text-sm text-gray-600"><Trans>Dedicated to serving Ontario residents</Trans></p>
						</div>

						<P className="text-sm">
							<Trans>Sources:</Trans> <ExternalLink href="https://www.ontario.ca/page/public-accounts-ontario-2023-24"><Trans>Public Accounts of Ontario 2023-24</Trans></ExternalLink>
						</P>
					</div>
				</Section>
				<Section>
					<H2><Trans>Ontario Government Ministries explained</Trans></H2>
					<P><Trans>Ontario's government is organized into ministries that deliver services and programs to residents across the province. Each ministry has specific responsibilities and manages different aspects of provincial government operations.</Trans></P>
					<OntarioMinistryList />
				</Section>
				<Section>
					<H2><Trans>Sources</Trans></H2>
					<P><Trans>All Ontario government spending data is sourced from the official Public Accounts of Ontario, but due to the complexity of these systems, occasional errors may occur despite our best efforts. We aim to make this information more accessible and accurate, and we welcome feedback. If you notice any issues, please let us know <InternalLink href="/contact">here</InternalLink> — we appreciate it and will work to address them promptly.</Trans></P>
				</Section>
			</PageContent>

		</Page>
	);
} 