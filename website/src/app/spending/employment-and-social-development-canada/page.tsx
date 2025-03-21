import { DepartmentList } from "@/components/DepartmentList";
import { DepartmentSpendingChart } from "@/components/DepartmentSpendingChart";
import { ExternalLink, GraphMock, H1, H2, Intro, P, Page, PageContent, Section, UL } from "@/components/Layout";
import { StatCard, StatCardContainer } from "@/components/StatCard";

const department = "Employment and Social Development Canada";

export default function Department() {
	return <Page>
		<PageContent>
			<Section>
				<H1>
					{department}
				</H1>
				<Intro>
					Established in 2005, ESDC is a federal department responsible for supporting Canadians through social programs and workforce development. It administers key programs such as Employment Insurance (EI), the Canada Pension Plan (CPP), Old Age Security (OAS), and skills training initiatives. ESDC also oversees Service Canada, which delivers government services directly to the public.
				</Intro>
			</Section>

			<Section>
				<div className="text-sm text-gray-500 italic">
					Data updated March 21, 2025
				</div>
				<StatCardContainer>
					<StatCard
						title="In FY 2024,"
						value="$94.48B"
						subtitle="was spent by ESDC"
					/>
					<StatCard
						title="In FY 2024,"
						value="18.4%"
						subtitle="of federal spending was by ESDC"
					/>
				</StatCardContainer>
			</Section>

			<Section>
				<P>
					ESDC spent $94.48 billion in fiscal year (FY) 2024. This was 18.4% of the $513.9 billion in overall federal spending, making it one of the highest-spending federal departments.
				</P>
				<P>ESDC accounted for 18.4% of all federal spending in FY 2024. 10 government departments accounted for 73.2% of federal spending in FY 2024.
				</P>
			</Section>

			<DepartmentSpendingChart department={department} />

			<Section>
				<P>
					Federal spending may shift over time due to population growth, changes in policy and programs, and emerging challenges. Since 2005, when ESDC was first established, overall federal spending has risen 62.9%, while ESDC spending has increased 1,485%.
				</P>
				<P>
					The department’s spending grew at a rate significantly higher than overall spending, reflecting shifts in federal priorities. In 2024, ESDC accounted for 18.4% of all federal spending, 16.51 percentage points higher than in 2005.
				</P>


			</Section>

			<Section>
				<H2>
					Major legislation, economic conditions, and external factors can impact ESDC’s spending.
				</H2>
				<P>
					For example, during the COVID-19 pandemic, federal support programs led to a temporary surge in spending. ESDC expenditures increased from $63.3 billion in 2019 to $169.2 billion in 2021 before stabilizing in recent years.

				</P>
			</Section>

			<Section>
				<H2>
					Most federal spending can be categorized as direct or indirect.
				</H2>
				<P>
					Direct spending refers to money allocated to government programs, employee salaries, and administrative expenses. Indirect spending includes federal transfers to individuals and provinces.
				</P>
			</Section>

			<GraphMock text="Graph 2" department={department} />

			<Section>
				<H2>
					In FY 2024, ESDC transferred 63% of its total spending to individuals and provinces.
				</H2>
				<P>
					The chart below outlines all departmental spending.
				</P>
			</Section>

			<GraphMock text="Graph 3" department={department} />

			<Section>
				<H2>How did ESDC spend its budget in 2024?</H2>
				<P>
					Federal government spending isolated to FY 2024
				</P>
			</Section>

			<GraphMock text="Graph 4" department={department} />

			<Section>
				<P>
					Federal departments often include multiple agencies and service delivery arms. In FY 2024, ESDC’s highest-expenditure entities included:
				</P>

				<UL>
					<li>Service Canada: responsible for processing EI, CPP, and OAS benefits.</li>
					<li>Canada Student Loans Program:  providing financial aid for post-secondary students.</li>
					<li>Labour Market Development Agreements (LMDAs): federal funding to provinces for job training and employment support.</li>
				</UL>

			</Section>

			<Section>
				<H2>Who leads ESDC?</H2>
				<P>
					The Department is currently led by the <ExternalLink href="https://www.canada.ca/en/employment-social-development.html">Minister of Jobs and Families</ExternalLink> who is appointed by the Governor General on the advice of the Prime Minister and then formally sworn into office at Rideau Hall. They take the Oath of Office and the Oath of Allegiance and become a member of the King’s Privy Council for Canada.
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