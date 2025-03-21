import { DepartmentList } from "@/components/DepartmentList";
import { DepartmentSpendingChart } from "@/components/DepartmentSpendingChart";
import { ExternalLink, GraphMock, H1, H2, Intro, P, Page, PageContent, Section, UL } from "@/components/Layout";
import { StatCard, StatCardContainer } from "@/components/StatCard";

export default function Department() {
	return <Page>
		<PageContent>
			<Section>
				<H1>
					Public Safety Canada
				</H1>
				<Intro>
					Public Safety, Democratic Institutions and Intergovernmental Affairs Canada (Public Safety Canada) is the federal department responsible for national security, emergency preparedness, and community safety. Established in 2003, it consolidates security, law enforcement, and emergency management functions. It includes the RCMP, CSIS, and CBSA and coordinates federal responses to threats and develops policies on crime prevention, cyber resilience, and disaster preparedness while overseeing intelligence-sharing with domestic and international partners.
				</Intro>
			</Section>

			<Section>
				<div className="text-sm text-gray-500 italic">
					Data updated March 21, 2025
				</div>
				<StatCardContainer>
					<StatCard
						title="In FY 2024,"
						value="$13.9B"
						subtitle="was spent by the Public Safety Canada"
					/>
					<StatCard
						title="In FY 2024,"
						value="2.7%"
						subtitle="of federal spending was by the Public Safety Canada"
					/>
				</StatCardContainer>
			</Section>

			<Section>
				<P>
					Public Safety Canada spent $13.9 billion in fiscal year (FY) 2024, accounting for 2.7% of the $513.9 billion in total federal spending. While not among the largest departments by expenditure, Public Safety Canada plays a crucial role in national security and emergency management, working in tandem with multiple agencies to mitigate threats and enhance public safety.
				</P>

				<P>
					10 government departments accounted for 73.2% of federal spending in FY 2024.
				</P>

			</Section>

			<DepartmentSpendingChart department="Department of Public Safety and Emergency Preparedness" />

			<Section>
				<H2>
					How has Public Safety Canada’s spending changed?
				</H2>
				<P>
					Federal spending on public safety fluctuates based on evolving security threats, emergency events, and changes in government policy. Since 2005 shortly after it was established, Public Safety Canada's expenditures have increased by 69.6%, reflecting heightened investments in counterterrorism, cyber defence, and disaster response capabilities. The department’s share of the federal budget has remained relatively flat from 2.6% in 2005 to 2.7% in 2024.
				</P>
				<P>
					Major policy shifts, unforeseen events such as natural disasters, and global security concerns can significantly impact the department’s annual spending. The COVID-19 pandemic, for example, led to a sharp increase in federal emergency response funding in 2020.
				</P>
			</Section>



			<Section>
				<H2>
					How did Public Safety Canada spend its budget in 2024?
				</H2>
				<P>
					In FY 2024, Public Safety’s budget was allocated across several key areas, including:
				</P>
				<UL>
					<li>Law enforcement and security (RCMP, CSIS, CBSA): $8.6 billion</li>
					<li>Emergency management and disaster response: $1.5 billion</li>
					<li>Correctional Service Canada and parole programs: $3.5 billion</li>

				</UL>
			</Section>

			<GraphMock text="PSC Graph 2" />


			<Section>
				<H2>Who leads Public Safety Canada?</H2>
				<P>
					The Department is led by the <ExternalLink href="https://www.canada.ca/en/government/ministers/david-mcguinty.html">Minister of Public Safety</ExternalLink>, who is appointed by the Governor General on the advice of the Prime Minister and then formally sworn into office at Rideau Hall. They take the Oath of Office and the Oath of Allegiance and become a member of the King’s Privy Council for Canada.
				</P>
				<P>
					These Ministers are some of the <ExternalLink href="https://www.pm.gc.ca/en/cabinet">cabinet members</ExternalLink> who serve at the Prime Minister’s discretion. Their tenure typically ends when they resign, are replaced, or when a new Prime Minister takes office and appoints a new cabinet. Outgoing ministers remain in their roles until their successors are sworn in.
				</P>
			</Section>

			<Section>
				<H2>Explore other Federal Departments</H2>
				<DepartmentList />
			</Section>
		</PageContent>
	</Page>

}