import { DepartmentList } from "@/components/DepartmentList";
import { DepartmentSpendingChart } from "@/components/DepartmentSpendingChart";
import { ChartContainer, ExternalLink, H1, H2, H3, Intro, P, Page, PageContent, Section } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { StatCard, StatCardContainer } from "@/components/StatCard";
import type { Metadata } from 'next';
import { FederalSpendingChart } from "./FederalSpendingChart";
import { MiniSankey } from "./MiniSankey";

export const metadata: Metadata = {
	title: 'Canada Revenue Agency| Canada Spends',
	description: 'A look at how the Canada Revenue Agency spends its budget',
}


const department = 'Canada Revenue Agency'

export default function Department() {
	return <Page>
		<PageContent>
			<Section>
				<H1>
					{department}
				</H1>
				<Intro>
					The Canada Revenue Agency (CRA) is the federal institution responsible for administering tax laws, enforcing compliance, and delivering key benefit programs to individuals and businesses across Canada. Established in 1999 under the Canada Revenue Agency Act, the CRA operates with a workforce of approximately 59,155 employees (2024) and oversees tax revenues totaling $379 billion annually—which accounts for over 82% of federal revenues. It also administers over $46 billion in benefits and credits to Canadians, including the Canada Child Benefit and the GST/HST credit.
				</Intro>

			</Section>

			<Section>
				<div className="text-sm text-gray-500 italic">
					Data updated March 21, 2025
				</div>
				<StatCardContainer>
					<StatCard
						title="In FY 2024,"
						value="$16.8B"
						subtitle="was spent by the Canada Revenue Agency"
					/>
					<StatCard
						title="In FY 2024,"
						value="3.2%"
						subtitle="of federal spending was by the Canada Revenue Agency"
					/>
				</StatCardContainer>
			</Section>

			<Section>
				<P>
					The Canada Revenue Agency spent $16.8 billion in fiscal year (FY) 2024, representing 3.2% of the $513.9 billion in total federal spending. The CRA’s expenditures primarily support tax administration, benefit program delivery, compliance enforcement, and IT modernization.
				</P>

				<H3>
					10 government departments accounted for 73.2% of federal spending in FY 2024.
				</H3>

				<ChartContainer>
					<DepartmentSpendingChart department={department} />
				</ChartContainer>


			</Section>

			<Section>
				<ChartContainer>
					<H3>
						Percentage of federal budget dedicated to Canada Revenue Agency, FYs 1995-2024
					</H3>
					<FederalSpendingChart />
				</ChartContainer>
			</Section>
			<Section>
				<P>
					Federal spending may shift over time due to economic fluctuations, changes in tax policy, and the expansion of benefit programs. Since 1995, overall federal spending has risen 74.9%, while Canada Revenue Agency spending has increased 302%
				</P>
				<P>
					CRA’s spending grew more than overall spending, meaning its share of the federal budget increased. In 2024, the agency accounted for 3.2% of all federal spending, 0.6 percentage points lower than in 1995.
				</P>
				<P>
					Major legislative changes, compliance trends, and digital tax services have influenced CRA spending patterns. For example, compliance initiatives and fraud investigations recovered an estimated $11.5 billion in lost revenue in 2024 due to tax evasion.
				</P>
				<P>
					Most federal spending can be categorized as direct or indirect. Direct spending refers to money the federal government spends on budget items such as federal programs, employee salaries, and debt interest. Indirect spending refers to federal transfers to other levels of government.
				</P>
				<P>
					Most CRA spending is dedicated to personnel and IT infrastructure supporting tax filing, compliance, and benefit administration.
				</P>
				<P>
					In FY 2024, 55.2% of CRA net spending was allocated to salaries, benefits, and pensions.
				</P>


			</Section>

			<Section>
				<H2>
					How did the Canada Revenue Agency spend its budget in 2024?
				</H2>
				<P>
					CRA spending is divided across tax administration, compliance enforcement, benefit program delivery, and intergovernmental agreements with provinces and territories. The largest expenditures in FY 2024 included personal income tax processing, corporate tax audits, and benefit administration.
				</P>

				<ChartContainer>
					<NoSSR>
						<MiniSankey />
					</NoSSR>
				</ChartContainer>
			</Section>


			<Section>
				<H2>Who leads the Canada Revenue Agency?</H2>
				<P>
					The Canada Revenue Agency is overseen by the <ExternalLink href="https://www.canada.ca/en/government/ministers/marie-claude-bibeau.html">Minister of National Revenue</ExternalLink>, who is responsible for ensuring tax fairness and benefit program integrity but does not have direct authority over tax law interpretations.
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