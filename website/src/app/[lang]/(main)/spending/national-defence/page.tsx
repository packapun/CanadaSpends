
import { DepartmentList } from "@/components/DepartmentList";
import { DepartmentSpendingChart } from "@/components/DepartmentSpendingChart";
import { ChartContainer, ExternalLink, H1, H2, H3, Intro, P, Page, PageContent, Section } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { StatCard, StatCardContainer } from "@/components/StatCard";
import type { Metadata } from 'next';
import { FederalSpendingByEntity } from "./FederalSpendingByEntity";
import { FederalSpendingChart } from "./FederalSpendingChart";
import { MiniSankey } from "./MiniSankey";

export const metadata: Metadata = {
	title: 'National Defence| Canada Spends',
	description: 'A look at how the National Defence spends its budget',
}

const department = "National Defence";

export default function Department() {
	return <Page>
		<PageContent>
			<Section>
				<H1>
					{department}
				</H1>
				<Intro>
					The Department of National Defence (DND) and the Canadian Armed Forces (CAF) are responsible for ensuring Canada’s security and defence through military operations, infrastructure management, and personnel support. Established in 1923 under the National Defence Act, DND oversees the defence budget, military procurement, and readiness planning, while the CAF executes domestic and international operations. The department provides strategic defence policy guidance and works with international allies, including NATO and NORAD, to ensure national security. DND also administers military health services, housing programs, and recruitment initiatives to support its personnel.
				</Intro>

			</Section>

			<Section>
				<div className="text-sm text-gray-500 italic">
					Data updated March 21, 2025
				</div>
				<StatCardContainer>
					<StatCard
						title="In FY 2024,"
						value="$34.5B"
						subtitle="was spent by the Department of National Defence"
					/>
					<StatCard
						title="In FY 2024,"
						value="6.7%"
						subtitle="of federal spending was by the Department of National Defence"
					/>
				</StatCardContainer>
			</Section>

			<Section>
				<P>
					The Department of National Defence spent $34.5 billion in fiscal year (FY) 2024. This represented 6.7% of the $513.9 billion in total federal spending. DND ranked among the top federal departments in expenditures, largely driven by personnel costs, military procurement, and operational readiness efforts.
				</P>

				<P>
					10 government departments accounted for 73.2% of federal spending in FY 2024.
				</P>

			</Section>

			<Section>
				<ChartContainer>
					<H3>Percentage of federal budget dedicated to Defence, FYs 1995-2024</H3>
					<DepartmentSpendingChart department={department} />
				</ChartContainer>
			</Section>


			<Section>
				<P>
					Federal spending may shift over time due to geopolitical tensions, defence modernization needs, and emerging threats such as cyber warfare. Since 1995, overall federal spending has risen 74.9%, while Department of National Defence spending has increased 59.9%.
				</P>
				<P>
					DND’s spending grew less than overall spending, meaning its share of the federal budget decreased. In 2024, the department accounted for 6.7% of all federal spending, 0.6 percentage points lower than in 1995.
				</P>
				<ChartContainer>
					<FederalSpendingChart />
				</ChartContainer>
				<P>
					Major legislation, shifts in international security dynamics, and acute events such as Russia’s invasion of Ukraine or Arctic sovereignty disputes can influence military spending.
				</P>
				<P>
					Most federal spending can be categorized as direct or indirect. Direct spending refers to money the federal government spends on budget items such as federal programs, employee salaries, and debt interest. Indirect spending refers to federal transfers to other levels of government.
				</P>
				<P>
					Most federal defence spending is categorized as either personnel-related or capital expenditures. Personnel costs cover wages, benefits, and pensions for military and civilian employees. Capital expenditures fund procurement, infrastructure, and weapons systems.
				</P>
				<H3>
					In FY 2024, 45.6% of DND spending was allocated to personnel salaries, benefits, and pensions. 14.7% was directed to procurement of machinery and equipment.
				</H3>
				<ChartContainer>
					<H3>National Defence, Spending by Entity, FY 2024 (in billions)</H3>
					<FederalSpendingByEntity />
				</ChartContainer>

			</Section>

			<Section>
				<H2>
					How did the Department of National Defence spend its budget in 2024?
				</H2>
				<P>
					Federal departments often include additional agencies, commands, and operational divisions. In FY 2024, the largest spending entities within DND were the Canadian Army, the Royal Canadian Navy, and the Royal Canadian Air Force, accounting for the bulk of military expenditures.
				</P>
				<ChartContainer>
					<NoSSR>
						<MiniSankey />
					</NoSSR>
				</ChartContainer>
			</Section>




			<Section>
				<H2>Who leads the Department of National Defence?</H2>
				<P>
					The Department of National Defence is led by the <ExternalLink href="https://www.pm.gc.ca/en/cabinet/honourable-bill-blair">Minister of National Defence</ExternalLink>, who is appointed by the Governor General on the advice of the Prime Minister. The minister is responsible for overseeing national defense policy, military operations, and procurement.
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