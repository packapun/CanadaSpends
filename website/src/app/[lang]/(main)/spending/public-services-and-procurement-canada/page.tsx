import { DepartmentList } from "@/components/DepartmentList";
import { DepartmentSpendingChart } from "@/components/DepartmentSpendingChart";
import { ChartContainer, H1, H2, Intro, P, Page, PageContent, Section } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { StatCard, StatCardContainer } from "@/components/StatCard";
import type { Metadata } from 'next';
import { FederalSpendingByEntity } from "./FederalSpendingByEntity";
import { MiniSankey } from "./MiniSankey";

export const metadata: Metadata = {
	title: 'Public Services and Procurement Canada | Canada Spends',
	description: 'A look at how Public Services and Procurement Canada spends its budget',
}

const department = "Public Services and Procurement Canada";

export default function Department() {
	return <Page>
		<PageContent>
			<Section>
				<H1>
					{department}
				</H1>
				<Intro>
					The Public Services and Procurement Canada (PSPC) is the federal department responsible for providing centralized procurement, real estate management, pay and pension administration for federal employees, and translation services to the Government of Canada. It ensures that government departments have the goods, services, and infrastructure they need to operate efficiently while maintaining transparency, fairness, and value for taxpayers.
				</Intro>
			</Section>

			<Section>
				<div className="text-sm text-gray-500 italic">
					Data updated March 21, 2025
				</div>
				<StatCardContainer>
					<StatCard
						title="In FY 2024,"
						value="$8.3B"
						subtitle="Was spent by Public Services and Procurement Canada"
					/>
					<StatCard
						title="In FY 2024,"
						value="1.6%"
						subtitle="Of federal spending was by Public Services and Procurement Canada"
					/>
				</StatCardContainer>
			</Section>

			<Section>
				<P>
					PSPC spent $8.3 billion in fiscal year (FY) 2024. This was 1.6% of the $513.9 billion in overall federal spending. The department ranked twelfth among federal departments in total spending.
				</P>

				<P>
					PSPC accounted for 1.6% of all federal spending in FY 2024. 10 government departments accounted for 73.2% of federal spending in FY 2024
				</P>
			</Section>

			<DepartmentSpendingChart department={department} />

			<Section>
				<P>
					Federal spending may shift over time due to population growth, changes in policy and programs, and emerging problems to address. Since 1995, overall federal spending has risen 74.9%, while PSPC spending has increased by 7.1% when adjusted for inflation.
				</P>
				<P>
					The department's spending has increased less than overall spending has grown and the department's share of the federal budget has decreased over time. In FY 2024, PSPC accounted for 1.6% of all federal spending, 1 percentage point lower than in 1995.
				</P>
				<P>
					Major legislation, internal or global economic conditions, and acute events like the COVID-19 pandemic can significantly influence government spending year to year. For instance, during the pandemic, the Government of Canada's total expenses rose from $410.2 billion in 2019 to $420 billion in 2020 and further to $720.3 billion in 2021.
				</P>
				<P>
					Similarly, PSPC's expenditures experienced notable fluctuations during this period, decreasing from approximately $6.8 billion​ in 2019 (adjusted for inflation) to $5.3 billion in 2021 before increasing again in 2024.
				</P>

				{/*<ChartContainer>*/}
				{/*	<FederalSpendingChart />*/}
				{/*</ChartContainer>*/}

			</Section>

			<Section>
				<H2>
					How did PSPC spend its budget in FY24?
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
					Federal departments often contain other entities including offices, crown corporations and agencies. In FY 2024, PSPC's budget was split across the following entities:
				</P>
				<ChartContainer>
					<FederalSpendingByEntity />
				</ChartContainer>
			</Section>

			<Section>
				<H2>Who Leads Public Services and Procurement Canada (PSPC)?</H2>
				<P>
					Public Services and Procurement Canada (PSPC) is led by the Minister of Government Transformation, Public Services and Procurement, who is appointed by the Governor General on the advice of the Prime Minister and formally sworn into office at Rideau Hall. Upon appointment, the Minister takes the Oath of Office and the Oath of Allegiance, becoming a member of the King's Privy Council for Canada.
				</P>
				<P>
					The Minister of Public Services and Procurement is one of the cabinet members who serve at the Prime Minister's discretion. Their tenure typically ends when they resign, are replaced, or when a new Prime Minister appoints a new cabinet. Outgoing ministers continue in their roles until their successors are sworn in.
				</P>
			</Section>

			<Section>
				<H2>Explore other Federal Departments</H2>
				<DepartmentList current={department} />
			</Section>
		</PageContent>
	</Page>

}