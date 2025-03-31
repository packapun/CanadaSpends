import { FederalSpendingByEntity } from "@/app/(main)/spending/innovation-science-and-industry/FederalSpendingByEntity";
import { MiniSankey } from "@/app/(main)/spending/innovation-science-and-industry/MiniSankey";
import { DepartmentList } from "@/components/DepartmentList";
import { DepartmentSpendingChart } from "@/components/DepartmentSpendingChart";
import { ChartContainer, H1, H2, Intro, P, Page, PageContent, Section } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { StatCard, StatCardContainer } from "@/components/StatCard";
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Innovation, Science and Industry | Canada Spends',
	description: 'A look at how the Department of Innovation, Science and Industry spends its budget',
}

const department = "Innovation, Science and Industry";

export default function Department() {
	return <Page>
		<PageContent>
			<Section>
				<H1>
					{department}
				</H1>
				<Intro>
					The Department of Innovation, Science and Industry (ISED) is the federal department responsible for fostering economic growth, technological advancement, and scientific research in Canada. It plays a key role in supporting businesses, funding research and development, and shaping policies that aim to enhance innovation, industrial competitiveness, and the prosperity of the Canadian economy.
				</Intro>
			</Section>

			<Section>
				<div className="text-sm text-gray-500 italic">
					Data updated March 21, 2025
				</div>
				<StatCardContainer>
					<StatCard
						title="In FY 2024,"
						value="$10.2B"
						subtitle="Was spent by the Dept. of Innovation, Science and Industry"
					/>
					<StatCard
						title="In FY 2024,"
						value="2%"
						subtitle="Of federal spending was by the Dept. of Innovation, Science and Industry"
					/>
				</StatCardContainer>
			</Section>

			<Section>
				<P>
					ISED spent $10.2 billion in fiscal year (FY) 2024. This was 2% of the $513.9 billion in overall federal spending. The department ranked eleventh among federal departments in total spending.
				</P>

				<P>
					While not in the top 10 departments by spend, ISED accounted for 2% of all federal spending in FY 2024. 10 government departments accounted for 73.2% of federal spending in FY 2024
				</P>
				<ChartContainer>
					<DepartmentSpendingChart department={department} />
				</ChartContainer>
			</Section>



			<Section>
				<P>
					Federal spending may shift over time due to population growth, changes in policy and programs, and emerging problems to address. Since 1995, overall federal spending has risen 74.9%, while ISED spending has increased 90.3%.
				</P>
				<P>
					The department's spending has grown more than overall spending, which means that the department's share of the federal budget has increased. In FY 2024, ISED accounted for 2% of all federal spending, 0.17 percentage points higher than in 1995.
				</P>
				<P>
					Major legislation, internal or global economic conditions, and acute events like the COVID-19 pandemic can significantly influence government spending year to year. For instance, during the pandemic, the Government of Canada's total expenses rose from $410.2 billion in 2019 to $420 billion in 2020 and further to $720.3 billion in 2021.
				</P>
				<P>
					Similarly, ISED's expenditures have increased during this period, growing from approximately $6.5 billion​ in 2019 (adjusted for inflation) to $10.2 billion in 2024.
				</P>
			</Section>

			<Section>
				<H2>
					How did ISED spend its budget in FY 24?
				</H2>
				<P>
					Federal government spending isolated to FY 2024
				</P>
				<ChartContainer>
					<NoSSR>
						<MiniSankey />
					</NoSSR>
				</ChartContainer>
			</Section>

			<Section>
				<P>
					Federal departments often contain other entities including offices, crown corporations and agencies. In FY 2024, ISED's budget was split across the following entities:
				</P>
				<ChartContainer>
					<FederalSpendingByEntity />
				</ChartContainer>
			</Section>

			<Section>
				<H2>Who Leads Innovation, Science and Industry Canada (ISED)?</H2>
				<P>
					Innovation, Science and Industry Canada (ISED) is led by the Minister of Innovation, Science and Industry, who is appointed by the Governor General on the advice of the Prime Minister and formally sworn into office at Rideau Hall. Upon appointment, the Minister takes the Oath of Office and the Oath of Allegiance, becoming a member of the King's Privy Council for Canada.
				</P>
				<P>
					The Minister of Innovation, Science and Industry is one of the cabinet members who serve at the Prime Minister's discretion. Their tenure typically ends when they resign, are replaced, or when a new Prime Minister appoints a new cabinet. Outgoing ministers continue in their roles until their successors are sworn in.
				</P>
			</Section>

			<Section>
				<H2>Explore other Federal Departments</H2>
				<DepartmentList current={department} />
			</Section>
		</PageContent>
	</Page>

}