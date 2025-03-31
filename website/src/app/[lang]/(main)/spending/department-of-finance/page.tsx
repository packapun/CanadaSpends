import { DepartmentList } from "@/components/DepartmentList";
import { DepartmentSpendingChart } from "@/components/DepartmentSpendingChart";
import { ChartContainer, ExternalLink, H1, H2, H3, Intro, P, Page, PageContent, Section } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { StatCard, StatCardContainer } from "@/components/StatCard";
import { initLingui, PageLangParam } from "@/initLingui";
import { useLingui } from "@lingui/react/macro";
import { PropsWithChildren } from "react";
import { FederalSpendingByEntity } from "./FederalSpendingByEntity";
import { FederalSpendingChart } from "./FederalSpendingChart";
import { MiniSankey } from "./MiniSankey";

export async function generateMetadata(props: PropsWithChildren<PageLangParam>) {
	const lang = (await props.params).lang
	initLingui(lang)

	const { t } = useLingui()
	return {
		title: t`Department of Finance | Canada Spends`,
		description: t`A look at how the Department of Finance spends its budget`,
	}
}

const department = "Department of Finance";

export default function Department() {
	return <Page>
		<PageContent>
			<Section>
				<H1>
					Department of Finance
				</H1>
				<Intro>
					The Department of Finance (Finance Canada) is a central federal department
					responsible for overseeing the nation's economic and fiscal policies, ensuring
					financial stability, and managing the government's fiscal framework.
					Established in 1867 as one of the original departments following
					Confederation, it advises the Prime Minister and Cabinet on economic matters,
					develops tax and tariff policies, and prepares the annual federal budget.
				</Intro>
			</Section>

			<Section>
				<div className="text-sm text-gray-500 italic">
					Data updated March 20, 2025
				</div>
				<StatCardContainer>
					<StatCard
						title="In FY 2024,"
						value="$136.1B"
						subtitle="was spent by Finance Canada"
						animationDelay="fade-in-delay-1"
					/>
					<StatCard
						title="In FY 2024,"
						value="26.4%"
						subtitle="of federal spending was by Finance Canada"
						animationDelay="fade-in-delay-2"
					/>
				</StatCardContainer>
			</Section>

			<Section>
				<P>
					The Department of Finance spent $136.1 billion in fiscal year (FY) 2024. This
					was 26.4% of the $513.9 billion in overall federal spending. The department
					ranked first among federal departments in total spending.
				</P>
			</Section>

			<Section>
				<H2>
					The Department of Finance accounted for 26.4% of all federal spending in FY 2024.
				</H2>
				<H3>
					10 government departments accounted for 73.2% of federal spending in FY 2024
				</H3>
				<ChartContainer>
					<DepartmentSpendingChart department={department} />
				</ChartContainer>
				<P>
					Federal spending may shift over time due to population growth, changes in policy and programs, and emerging problems to address. Since 1995, overall federal spending has risen 74.9%, while Department of Finance spending has increased 41.4%.
				</P>
				<P>
					Major legislation, internal or global economic conditions, and acute events like the COVID-19 pandemic can affect spending year to year. For example, the federal expenses fluctuated during the pandemic, rising from $410.2 billion (in 2024 dollars) in 2019 to $420 billion in 2020 and $720.3 billion in 2021
				</P>
			</Section>

			<Section>
				<H2>
					The Department of Finance's share of federal spending in FY 2024 was lower than FY 1995.
				</H2>
				<H3>
					Percentage of federal budget dedicated to Finance, FYs 1995-2024
				</H3>
				<ChartContainer>
					<FederalSpendingChart />
				</ChartContainer>
				<P>
					Most federal spending can be categorized as direct or indirect. Direct spending refers to money the federal government spends on budget items such as federal programs, employee salaries, and debt interest. Indirect spending refers to federal transfers to other levels of government.
				</P>
				<P>
					In FY 2024, Finance Canada transferred 66.2% of its total spending to provinces and territories. The chart below outlines all departmental spending.
				</P>
			</Section>


			<Section>
				<H2>
					How did the Department of Finance spend its budget in 2024?
				</H2>
				<H3>
					Federal government spending isolated to FY 2024
				</H3>
				<ChartContainer>
					<NoSSR>
						<MiniSankey />
					</NoSSR>
				</ChartContainer>
				<P>
					Federal departments often contain other entities including offices, crown corporations and agencies. In FY 2024, Department of Finance entities with the highest expenditures were the Office of the Superintendent of Financial Institutions, Office of the Auditor General, and the Financial Transactions and Reports Analysis Centre of Canada.
				</P>
				<H3>Department of Finance, Spending by Entity, FY 2024 (in millions)</H3>
				<ChartContainer>
					<FederalSpendingByEntity />
				</ChartContainer>
			</Section>


			<Section>
				<H2>
					Who leads the Department of Finance?
				</H2>
				<P>
					The Department is led by the <ExternalLink href="https://www.canada.ca/en/government/ministers/dominic-leblanc.html">Minister of Finance</ExternalLink>, who is appointed by the Governor General on the advice of the Prime Minister and then formally sworn into office at Rideau Hall. They take the Oath of Office and the Oath of Allegiance and become a member of the King's Privy Council for Canada.
				</P>
				<P>
					The Minister of Finance is one of the <ExternalLink href="https://www.pm.gc.ca/en/cabinet" >cabinet members</ExternalLink> who serve at the Prime Minister's discretion. Their tenure typically ends when they resign, are replaced, or when a new Prime Minister takes office and appoints a new cabinet. Outgoing ministers remain in their roles until their successors are sworn in.
				</P>
			</Section>

			<Section>
				<H2>Explore other Federal Departments</H2>
				<DepartmentList current={department} />
			</Section>

		</PageContent>
	</Page>

}