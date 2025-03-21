import { DepartmentList } from "@/components/DepartmentList";
import { DepartmentSpendingChart } from "@/components/DepartmentSpendingChart";
import { ExternalLink, GraphMock, H1, H2, Intro, P, Page, PageContent, Section } from "@/components/Layout";
import { StatCard, StatCardContainer } from "@/components/StatCard";

export default function Department() {
	return <Page>
		<PageContent>
			<Section>
				<H1>
					Indigenous Services Canada and Crown-Indigenous Relations and Northern Affairs Canada
				</H1>
				<Intro>
					Indigenous Services Canada (ISC) and Crown-Indigenous Relations and Northern Affairs Canada (CIRNAC) are two distinct federal departments tasked with advancing Indigenous priorities in Canada. Established in 2017 following the dissolution of Indigenous and Northern Affairs Canada (INAC), these departments manage different aspects of Indigenous policy, service delivery, and governance.

				</Intro>
				<Intro>
					ISC is responsible for providing essential services to First Nations, Inuit, and Métis communities, including healthcare, education, housing, and child and family services. It also works to transfer control of these services to Indigenous-led organizations. CIRNAC focuses on treaty negotiations, self-government agreements, land claims, and Northern affairs, aiming to strengthen nation-to-nation relationships and modernize Indigenous governance structures. Together, ISC and CIRNAC oversee key programs that impact Indigenous communities across Canada.
				</Intro>
			</Section>

			<Section>
				<div className="text-sm text-gray-500 italic">
					Data updated March 21, 2025
				</div>
				<StatCardContainer>
					<StatCard
						title="In FY 2024,"
						value="$63B"
						subtitle="was spent by ISC and CIRNAC"
					/>
					<StatCard
						title="In FY 2024,"
						value="12.2%"
						subtitle="of federal spending was allocated to Indigenous priorities via these Departments. This does not include additional programs in other departments designed specifically for Indigenous beneficiaries."
					/>
				</StatCardContainer>
			</Section>

			<Section>
				<P>
					In fiscal year (FY) 2024, ISC and CIRNAC collectively spent <strong>$63 billion</strong>, accounting for <strong>12.1% of the total federal budget</strong>. The departments play a critical role in addressing socio-economic disparities, facilitating self-governance agreements, and improving service delivery for Indigenous communities across Canada.
				</P>

			</Section>

			<DepartmentSpendingChart department="Department of Crown-Indigenous Relations and Northern Affairs" />

			<Section>
				<P>
					Federal spending on Indigenous priorities may fluctuate over time due to population growth, policy shifts, and emerging challenges such as climate change and infrastructure deficits. Since 1995, total federal spending has risen by 74.9%, while spending on Indigenous priorities has increased by 592%, reflecting expanded program commitments and new governance agreements and claim settlements.
				</P>
				<P>
					Despite these increases, significant challenges remain in areas such as housing, healthcare access, and infrastructure in remote Indigenous communities.
				</P>

			</Section>

			<Section>
				<H2>
					How did ISC and CIRNAC spend their budgets in 2024?
				</H2>
				<P>
					Most federal spending can be categorized as direct or indirect. Direct spending refers to money the federal government spends on budget items such as federal programs, employee salaries, and debt interest. Indirect spending refers to federal transfers to other levels of government.
				</P>
				<P>
					In FY 2024, ISC and CIRNAC transferred 93.1% of total spending directly to indigenous communities.
				</P>
			</Section>

			<GraphMock text="ISC Graph 2" />


			<Section>
				<H2>Who leads ISC and CIRNAC?</H2>
				<P>
					The leadership of ISC and CIRNAC are led by the <ExternalLink href="https://www.canada.ca/en/government/ministers/patty-hajdu.html">Minister of Indigenous Services Canada</ExternalLink> and the <ExternalLink href="https://www.pm.gc.ca/en/cabinet/honourable-gary-anandasangaree">Minister of Crown-Indigenous Relations and Northern Affairs Canada</ExternalLink>, respectively.  These Ministers are appointed by the Governor General on the advice of the Prime Minister and then formally sworn into office at Rideau Hall. They take the Oath of Office and the Oath of Allegiance and become a member of the King’s Privy Council for Canada.
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