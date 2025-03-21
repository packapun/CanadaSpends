"use client"

import { BarChart } from "@/components/BarChart";
import { BarList } from "@/components/BarList";
import { H2, P, Page, PageContent, Section } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { Sankey } from "@/components/Sankey";
import Link from "next/link";

interface AgencyProps {
	name: string;
	slug: string;
}

const StatBox = ({ title, value, description }: { title: string, value: string, description: string }) => (
	<div className="flex flex-col mr-8 mb-8">
		<div className="text-sm text-gray-600 mb-1">{title}</div>
		<div className="text-3xl font-bold mb-1">{value}</div>
		<div className="text-sm text-gray-600">{description}</div>
	</div>
);

const AgencyItem = ({ name, slug }: AgencyProps) =>
	<div className="py-3 border-b border-gray-200">
		<Link href={`/spending/${slug}`} className="font-medium">{name}</Link>
	</div>


const agencies = [
	{
		name: "Department of Finance",
		slug: "department-of-finance"
	},
	{
		name: "Employment and Social Development Canada",
		slug: "employment-and-social-development-canada"
	},
	{
		name: "Department of Indigenous Services and Crown-Indigenous Relations and Northern Affairs Canada",
		slug: "indigenous-services-and-northern-affairs"
	},
	{
		name: "National Defence",
		slug: "national-defence"
	},
	{
		name: "Canada Revenue Agency",
		slug: "canada-revenue-agency"
	},
	{
		name: "Public Safety Canada",
		slug: "public-safety-canada"
	},
	{
		name: "Global Affairs Canada",
		slug: "global-affairs-canada"
	},
	{
		name: "Housing, Infrastructure and Communities Canada",
		slug: "housing-infrastructure-communities"
	},
	{
		name: "Health Canada",
		slug: "health-canada"
	}
]

const tenureData = [
	{ name: "Casual", value: 6990 },
	{ name: "Indeterminate", value: 301131 },
	{ name: "Student", value: 9120 },
	{ name: "Term", value: 47460 },
]

const ageData = [
	{ name: '<20', value: 1756 },
	{ name: '20-24', value: 33596 },
	{ name: '25-29', value: 78800 },
	{ name: '30-34', value: 89426 },
	{ name: '35-39', value: 187657 },
	{ name: '40-44', value: 216806 },
	{ name: '45-49', value: 216024 },
	{ name: '50-54', value: 190226 },
	{ name: '55-59', value: 146872 },
	{ name: '60-64', value: 84865 },
	{ name: '65+', value: 39494 },

]

export default function Spending() {
	return (
		<Page>
			<PageContent>
				<Section>
					<div className="text-center mb-10">
						<h1 className="text-4xl font-bold mb-3">Government Spending</h1>
						<p className="text-gray-600 max-w-2xl mx-auto">
							Get data-driven insights into how governmental revenue and spending affect Canadian lives and programs.
						</p>
					</div>

					<div className="py-6">
						<h2 className="text-xl font-bold mb-1">FY 2024 Government Revenue and Spending</h2>
						<p className="text-sm text-gray-600">
							Explore revenue and spending categories or filter by agency for deeper insights.
						</p>
					</div>
				</Section>
			</PageContent>
			<div className='sankey-chart-container'>
				<NoSSR>
					<Sankey />
				</NoSSR>
			</div>
			<PageContent>
				<Section>
					<H2>Government Workforce</H2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<StatBox
							title="Headcount"
							value="367,772"
							description="Total government employees"
						/>

						<StatBox
							title="Departments + Agencies"
							value="94"
							description="Federal organizations"
						/>

						<StatBox
							title="Total Wages"
							value="$56.5B"
							description="Annual payroll"
						/>

						<div>
							<h3 className="font-medium mb-2">Type of Tenure</h3>
							<p className="text-sm text-gray-600">80% of employees are in permanent roles</p>
							<div className="mt-4">
								<BarList
									className="h-40"
									data={tenureData}
									valueFormatter={(value) => Intl.NumberFormat('en-US', {
										notation: 'compact',
									}).format(Number(value))}
								/>
							</div>
						</div>

						<div>
							<h3 className="font-medium mb-2">Age</h3>
							<p className="text-sm text-gray-600">The average employee is 45 years old</p>
							<div className="mt-4">
								<BarChart
									className="h-40"
									data={ageData}
									index="name"
									showLegend={false}
									categories={["value"]}
									valueFormatter={(value) => Intl.NumberFormat('en-US', {
										notation: 'compact',
									}).format(Number(value))}
								/>
							</div>
						</div>
						<div>
							<h3 className="font-medium mb-2">Salary</h3>
							<p className="text-sm text-gray-600">The average employee makes $91,000/yr</p>
						</div>
					</div>
				</Section>
				<Section>
					<H2>Sources</H2>
					<P>We have used Treasury Board databases for Public Service demographic information and Parliamentary Budget Office data for information on employee wages. While we try our best to be accurate, we're limited by the information available.</P>
				</Section>
				<Section>
					<H2>Government agencies explained</H2>
					<P>
						{agencies.map((agency) => <AgencyItem key={agency.slug} {...agency} />)}
					</P>
				</Section>
			</PageContent>

		</Page>
	);
}
