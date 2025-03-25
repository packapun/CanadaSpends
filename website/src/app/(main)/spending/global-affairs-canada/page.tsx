import { FederalSpendingByEntity } from "@/app/(main)/spending/global-affairs-canada/FederalSpendingByEntity";
import { FederalSpendingChart } from "@/app/(main)/spending/global-affairs-canada/FederalSpendingChart";
import { MiniSankey } from "@/app/(main)/spending/global-affairs-canada/MiniSankey";
import { DepartmentList } from "@/components/DepartmentList";
import { ChartContainer, ExternalLink, H1, H2, Intro, P, Page, PageContent, Section, UL } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { StatCard, StatCardContainer } from "@/components/StatCard";
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Global Affairs Canada| Canada Spends',
	description: 'A look at how the Global Affairs Canada spends its budget',
}

const department = "Global Affairs Canada";

export default function Department() {
	return <Page>
		<PageContent>
			<Section>
				<H1>
					{department}
				</H1>
				<Intro>
					Global Affairs Canada (GAC) is the federal department responsible for managing Canada’s diplomatic relations, international trade, and development assistance. Established in 1909 as the Department of External Affairs, GAC has evolved to oversee Canada’s engagement in global affairs, promoting national interests abroad and ensuring the protection of Canadian citizens overseas. The department negotiates international agreements, administers trade policies, and provides humanitarian aid. Additionally, it supports Canadian businesses in expanding internationally and strengthens diplomatic ties through multilateral organizations like the United Nations, the World Trade Organization (WTO), and NATO. GAC also plays a critical role in crisis response, assisting Canadians abroad during emergencies, and fostering global security and stability.
				</Intro>
			</Section>

			<Section>
				<div className="text-sm text-gray-500 italic">
					Data updated March 21, 2025
				</div>
				<StatCardContainer>
					<StatCard
						title="In FY 2024,"
						value="$19.2B"
						subtitle="was spent by the Global Affairs Canada"
					/>
					<StatCard
						title="In FY 2024,"
						value="3.7%"
						subtitle="of federal spending was by the Global Affairs Canada"
					/>
				</StatCardContainer>
			</Section>

			<Section>
				<P>
					Global Affairs Canada spent $19.2 billion in fiscal year (FY) 2024, representing 3.7% of the $513.9 billion in overall federal spending. This placed GAC among the mid-sized federal departments in terms of total expenditures.
				</P>

				<P>
					GAC accounted for 3.7% of all federal spending in FY 2024. 10 government departments accounted for 73.2% of federal spending in FY 2024.
				</P>

				<ChartContainer>
					<FederalSpendingChart />
				</ChartContainer>

				<P>
					Federal spending may shift over time due to changing global circumstances, diplomatic priorities, and Canada’s economic relationships. Since 1995, overall federal spending has increased by 74.9%, while Global Affairs Canada’s budget has grown by 166.5%, reflecting an expansion in international engagement.
				</P>
				<P>
					While GAC’s spending has increased in real terms, its share of the federal budget has also increased moderately over the past decades. In 2024, GAC accounted for 3.7% of federal spending, compared to 2% in 1995.
				</P>
				<P>
					Major international events, trade agreements, foreign aid commitments, and global crises such as the COVID-19 pandemic have influenced fluctuations in spending. In 2020, GAC’s budget surged due to emergency international assistance programs, including vaccine distribution and humanitarian relief efforts.
				</P>

			</Section>



			<Section>
				<H2>
					How did Global Affairs Canada spend its budget in 2024?
				</H2>
				<P>
					GAC’s expenditures are divided across five primary categories:
				</P>
				<UL>
					<li>International Advocacy and Diplomacy: $1B</li>
					<li>Trade and Investment: $380.3M</li>
					<li>Development, Peace and Security Programming: $5.37B</li>
					<li>Help for Canadians Abroad: $85.98M</li>
					<li>Support for Canada’s Presence Abroad: $1.23B</li>
				</UL>
				<P>
					A significant portion of GAC’s budget supports Canada’s international development assistance, with key programs focused on climate adaptation, gender equality, and health initiatives in developing nations. The department also facilitates economic diplomacy and trade agreements that benefit Canadian businesses and secure investment opportunities abroad.
				</P>
				<ChartContainer>
					<NoSSR>
						<MiniSankey />
					</NoSSR>
				</ChartContainer>
			</Section>

			<Section>
				<H2>
					Federal government spending isolated to FY 2024
				</H2>
				<P>
					Federal departments often contain other entities. In FY 2024, Global Affairs Canada’s entities with the highest expenditures were:
				</P>
				<ChartContainer>
					<FederalSpendingByEntity />
				</ChartContainer>
			</Section>




			<Section>
				<H2>Who leads Global Affairs Canada?</H2>
				<P>
					Global Affairs Canada operates under a tripartite leadership structure, with three ministers appointed by the Prime Minister and formally sworn into office at Rideau Hall. The department’s leadership includes:
				</P>
				<UL>
					<li><ExternalLink href="https://www.pm.gc.ca/en/cabinet/honourable-melanie-joly">Minister of Foreign Affairs</ExternalLink>: Responsible for diplomacy, international security, international development assistance, and global partnerships.</li>
					<li><ExternalLink href="https://www.pm.gc.ca/en/cabinet/honourable-dominic-leblanc">Minister of International Trade</ExternalLink>: Oversees Canada’s trade negotiations, export promotion, and economic policy engagement.</li>
				</UL>
				<P>
					The ministers work alongside the Deputy Minister of Foreign Affairs and the Deputy Minister of International Trade, who manage the department’s operational and policy frameworks.
				</P>
				<P>
					These Ministers are some of the <ExternalLink href="https://www.pm.gc.ca/en/cabinet">cabinet members</ExternalLink> who serve at the Prime Minister’s discretion. Their tenure typically ends when they resign, are replaced, or when a new Prime Minister takes office and appoints a new cabinet. Outgoing ministers remain in their roles until their successors are sworn in.
				</P>
			</Section>

			<Section>
				<H2>Explore other Federal Departments</H2>
				<DepartmentList current={department} />
			</Section>
		</PageContent>
	</Page>

}