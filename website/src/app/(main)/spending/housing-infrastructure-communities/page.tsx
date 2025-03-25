import { FederalSpendingByEntity } from "@/app/(main)/spending/housing-infrastructure-communities/FederalSpendingByEntity";
import { FederalSpendingChart } from "@/app/(main)/spending/housing-infrastructure-communities/FederalSpendingChart";
import { MiniSankey } from "@/app/(main)/spending/housing-infrastructure-communities/MiniSankey";
import { DepartmentList } from "@/components/DepartmentList";
import { DepartmentSpendingChart } from "@/components/DepartmentSpendingChart";
import { ChartContainer, ExternalLink, H1, H2, Intro, P, Page, PageContent, Section } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { StatCard, StatCardContainer } from "@/components/StatCard";
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Housing, Infrastructure and Communities Canada| Canada Spends',
	description: 'A look at how the Housing, Infrastructure and Communities Canada spends its budget',
}

const department = "Housing, Infrastructure and Communities Canada";

export default function Department() {
	return <Page>
		<PageContent>
			<Section>
				<H1>
					{department}
				</H1>
				<Intro>
					Housing, Infrastructure and Communities Canada (HICC) is responsible for federal policies and programs that support public infrastructure, affordable housing, and community development. It works with provinces, territories, and municipalities to fund major infrastructure projects and improve housing affordability across Canada.
				</Intro>
				<Intro>
					HICC administers the National Housing Strategy, which funds the construction, repair, and preservation of affordable housing. It also oversees the Canada Mortgage and Housing Corporation (CMHC), which provides mortgage insurance and financing programs. The department supports public transit, clean energy, and community infrastructure through programs like the Canada Infrastructure Bank (CIB).
				</Intro>
			</Section>

			<Section>
				<div className="text-sm text-gray-500 italic">
					Data updated March 21, 2025
				</div>
				<StatCardContainer>
					<StatCard
						title="In FY 2024,"
						value="$14.5B"
						subtitle="was spent by Housing, Infrastructure and Communities Canada"
					/>
					<StatCard
						title="In FY 2024,"
						value="2.8%"
						subtitle="of federal spending was by Housing, Infrastructure and Communities Canada"
					/>
				</StatCardContainer>
			</Section>

			<Section>
				<P>
					HICC spent $14.5 billion in fiscal year (FY) 2024. This was 2.8% of the $513.9 billion in overall federal spending. The department ranked eighth among federal departments in total spending.
				</P>

				<P>
					HICC accounted for 2.8% of all federal spending in FY 2024. 10 government departments accounted for 73.2% of federal spending in FY 2024.
				</P>
				<ChartContainer>
					<FederalSpendingChart />
				</ChartContainer>
			</Section>

			<DepartmentSpendingChart department={department} />

			<Section>

				<P>
					Federal spending may shift over time due to population growth, changes in policy and programs, and emerging problems to address.
				</P>
				<P>
					When HICC was founded in FY 2005 as the Office of Infrastructure Canada, the department’s spending has grown from $250,000 to over $14 billion, a significant increase in overall spending and mandate. In FY 2024, HICC accounted for 2.8% of all federal spending.
				</P>
				<P>
					Major legislation, internal or global economic conditions, and acute events like the COVID-19 pandemic can significantly influence government spending year to year. For instance, during the pandemic, the Government of Canada's total expenses rose from $410.2 billion in 2019 to $420 billion in 2020 and further to $720.3 billion in 2021.
				</P>
				<P>
					Similarly, HICC expenditures experienced notable fluctuations during this period, surging from approximately $5.9 billion​ in 2019 (adjusted for inflation) to $14.5B in 2024.
				</P>
				<ChartContainer>
					<FederalSpendingByEntity />
				</ChartContainer>
			</Section>



			<Section>
				<H2>
					How did HICC spend its budget in FY24?
				</H2>
				<P>
					Federal departments often contain other entities including offices, crown corporations and agencies. In FY 2024, HICC entities with the highest expenditures were Office of Infrastructure Canada, the Canada Mortgage and Housing Corporation and the Windsor-Detroit Bridge Authority.
				</P>
				<ChartContainer>
					<NoSSR>
						<MiniSankey />
					</NoSSR>
				</ChartContainer>
			</Section>


			<Section>
				<H2>Who leads Housing, Infrastructure and Communities Canada?</H2>
				<P>
					Housing, Infrastructure and Communities Canada (HICC) is led by the <ExternalLink href="https://www.pm.gc.ca/en/cabinet/honourable-nate-erskine-smith">Minister of Housing, Infrastructure and Communities</ExternalLink>, who is appointed by the Governor General on the advice of the Prime Minister and formally sworn into office at Rideau Hall. Upon appointment, the Minister takes the Oath of Office and the Oath of Allegiance, becoming a member of the King’s Privy Council for Canada.
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