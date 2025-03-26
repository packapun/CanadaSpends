import { FederalSpendingByEntity } from "@/app/(main)/spending/immigration-refugees-and-citizenship/FederalSpendingByEntity";
import { MiniSankey } from "@/app/(main)/spending/immigration-refugees-and-citizenship/MiniSankey";
import { DepartmentList } from "@/components/DepartmentList";
import { DepartmentSpendingChart } from "@/components/DepartmentSpendingChart";
import { ChartContainer, ExternalLink, H1, H2, Intro, P, Page, PageContent, Section } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { StatCard, StatCardContainer } from "@/components/StatCard";
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Immigration, Refugees and Citizenship | Canada Spends',
	description: 'A look at how the Department of Immigration, Refugees and Citizenship spends its budget',
}

const department = "Immigration, Refugees and Citizenship";

export default function Department() {
	return <Page>
		<PageContent>
			<Section>
				<H1>
					{department}
				</H1>
				<Intro>
					The Department of Immigration, Refugees and Citizenship Canada (IRCC) is the federal department responsible for managing immigration policies, issuing passports, processing visas and permanent residency applications, and supporting newcomers to Canada. It plays a key role in shaping Canada's immigration system, refugee protection policies, and pathways to citizenship.
				</Intro>
			</Section>

			<Section>
				<div className="text-sm text-gray-500 italic">
					Data updated March 21, 2025
				</div>
				<StatCardContainer>
					<StatCard
						title="In FY 2024,"
						value="$6.3B"
						subtitle="Was spent by the Dept. of Immigration, Refugees and Citizenship"
					/>
					<StatCard
						title="In FY 2024,"
						value="1.2%"
						subtitle="Of federal spending was by the Dept. of Immigration, Refugees and Citizenship"
					/>
				</StatCardContainer>
			</Section>

			<Section>
				<P>
					IRCC spent $6.3 billion in fiscal year (FY) 2024. This was 1.2% of the $513.9 billion in overall federal spending. The department ranked thirteenth among federal departments in total spending.
				</P>

				<P>
					IRCC accounted for 1.2% of all federal spending in FY 2024. 10 government departments accounted for 73.2% of federal spending in FY 2024
				</P>
			</Section>

			<DepartmentSpendingChart department={department} />

			<Section>
				<P>
					Federal spending may shift over time due to population growth, changes in policy and programs, and emerging problems to address. Since 1995, overall federal spending has risen 74.9%, while IRCC spending has increased 428% (adjusted for inflation).
				</P>
				<P>
					The department's spending has grown more than overall spending, which means that the department's share of the federal budget has increased. In FY 2024, IRCC accounted for 1.2% of all federal spending, 0.8 percentage points higher than in 1995.
				</P>
				<P>
					Major legislation, internal or global economic conditions, and acute events like the COVID-19 pandemic can significantly influence government spending year to year. For instance, during the pandemic, the Government of Canada's total expenses rose from $410.2 billion in 2019 to $420 billion in 2020 and further to $720.3 billion in 2021.​
				</P>
				<P>
					Similarly, IRCC's expenditures experienced notable fluctuations during this period, surging from approximately $3.02 billion​ in 2019 to $6.3 billion in 2024.
				</P>
			</Section>

			<Section>
				<H2>
					How did IRCC spend its budget in FY24?
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
					Federal departments often contain other entities including offices, crown corporations and agencies. In FY 2024, IRCC reported total expenditures of $6.2 billion, broken out as follows:
				</P>
				<ChartContainer>
					<FederalSpendingByEntity />
				</ChartContainer>
			</Section>

			<Section>
				<H2>Who Leads Immigration, Refugees and Citizenship Canada (IRCC)?</H2>
				<P>
					Immigration, Refugees and Citizenship Canada (IRCC) is led by the Minister of Immigration, Refugees and Citizenship, who is appointed by the Governor General on the advice of the Prime Minister and formally sworn into office at Rideau Hall. Upon appointment, the Minister takes the Oath of Office and the Oath of Allegiance, becoming a member of the King's Privy Council for Canada.
				</P>
				<P>
					The Minister of Immigration, Refugees and Citizenship is one of the cabinet members who serve at the Prime Minister's discretion. Their tenure typically ends when they resign, are replaced, or when a new Prime Minister appoints a new cabinet. Outgoing ministers continue in their roles until their successors are sworn in.
				</P>
			</Section>

			<Section>
				<H2>Explore other Federal Departments</H2>
				<DepartmentList current={department} />
			</Section>
		</PageContent>
	</Page>

}