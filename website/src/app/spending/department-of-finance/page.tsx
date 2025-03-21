import { StatCard, StatCardContainer } from "@/components/StatCard";

const Section = ({ children }: { children: React.ReactNode }) => {
	return <div className="mt-16 max-w-[800px] mx-auto">
		{children}
	</div>
}

const GraphMock = () => <div className="mt-8 max-w-[800px] mx-auto bg-white rounded-xl shadow-chart slide-up slide-up-delay-2">
	<div className="w-full h-80 bg-amber-900">Graph</div>
</div>


const H1 = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
	<h1 className={`text-4xl sm:text-5xl font-bold tracking-tight ${className}`}>
		{children}
	</h1>
)

const H2 = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
	<h2 className={`text-xl font-bold mb-6 ${className}`}>
		{children}
	</h2>
)

const P = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
	<p className={`text-gray-600 leading-relaxed mb-8 ${className}`}>
		{children}
	</p>
)

const Intro = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
	<P className={`mt-4 text-lg ${className}`}>
		{children}
	</P>
)

const Page = ({ children }: { children: React.ReactNode }) => <div className="min-h-screen bg-[#f8fafc]">
	<div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
		{children}
	</div></div>

export default function Department() {
	return <Page>
		<Section>
			<H1 >
				Department of Finance
			</H1>
			<Intro>
				The Department of Finance (Finance Canada) is a central federal agency
				responsible for overseeing the nation's economic and fiscal policies, ensuring
				financial stability, and managing the government's fiscal framework.
				Established in 1867 as one of the original departments following
				Confederation, it advises the Prime Minister and Cabinet on economic matters,
				develops tax and tariff policies, and prepares the annual federal budget.
			</Intro>
		</Section>

		<Section>
			<div className="text-sm text-gray-500">
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
			<P >
				The Department of Finance spent $136.1 billion in fiscal year (FY) 2024. This
				was 26.4% of the $513.9 billion in overall federal spending. The department
				ranked first among federal departments in total spending.
			</P>
		</Section>

		<Section>
			<H2>
				The Department of Finance accounted for 26.4% of all federal spending in FY 2024.
			</H2>
			<P>
				10 government departments accounted for 73.2% of federal spending in FY 2024
			</P>
		</Section>

		<GraphMock />

		<Section>
			<P>
				Federal spending may shift over time due to population growth, changes in policy and programs, and emerging problems to address. Since 1995, overall federal spending has risen 74.9%, while Department of Finance spending has increased 41.4%.
			</P>
			<P>
				Major legislation, internal or global economic conditions, and acute events like the COVID-19 pandemic can affect spending year to year. For example, the federal expenses fluctuated during the pandemic, rising from $410.2 billion (in 2024 dollars) in 2019 to $420 billion in 2020 and $720.3 billion in 2021
			</P>
		</Section>

		<Section>
			<H2>
				The Department of Finance's share of federal spending in FY 2024 was higher than FY 1995.
			</H2>
			<P>
				Percentage of federal budget dedicated to Finance, FYs 1995-2024
			</P>
		</Section>

		<GraphMock />

		<Section>
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
			<P>
				Federal government spending isolated to FY 2024
			</P>
		</Section>

		<GraphMock />

		<Section>
			<P>
				Federal departments often contain other entities including offices, crown corporations and agencies. In FY 2024, Department of Finance entities with the highest expenditures were the Office of the Superintendent of Financial Institutions, Office of the Auditor General, and the Financial Transactions and Reports Analysis Centre of Canada.
			</P>
		</Section>

		<GraphMock />

		<Section>
			<H2>
				Who leads the Department of Finance?
			</H2>
			<P>
				The Department is led by the <a href="https://www.canada.ca/en/government/ministers/dominic-leblanc.html" className="text-blue-500 underline">Minister of Finance</a>, who is appointed by the Governor General on the advice of the Prime Minister and then formally sworn into office at Rideau Hall. They take the Oath of Office and the Oath of Allegiance and become a member of the King’s Privy Council for Canada.

			</P>
			<P>
				The Minister of Finance is one of 36 <a href="https://www.pm.gc.ca/en/cabinet" className="text-blue-500 underline">cabinet members</a> who serve at the Prime Minister’s discretion. Their tenure typically ends when they resign, are replaced, or when a new Prime Minister takes office and appoints a new cabinet. Outgoing ministers remain in their roles until their successors are sworn in.
			</P>
		</Section>


	</Page>

}