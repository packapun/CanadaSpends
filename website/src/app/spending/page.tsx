"use client";

import { BarChart } from "@/components/BarChart";
import { BarList } from "@/components/BarList";
import { DepartmentList } from "@/components/DepartmentList";
import { H2, P, Page, PageContent, Section } from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { Sankey } from "@/components/Sankey";
import Head from "next/head";

const StatBox = ({ title, value, description }: { title: string, value: string, description: string }) => (
	<div className="flex flex-col mr-8 mb-8">
		<div className="text-sm text-gray-600 mb-1">{title}</div>
		<div className="text-3xl font-bold mb-1">{value}</div>
		<div className="text-sm text-gray-600">{description}</div>
	</div>
);

const tenureData = [
	{ name: "Casual", value: 6990 },
	{ name: "Indeterminate", value: 301131 },
	{ name: "Student", value: 9120 },
	{ name: "Term", value: 47460 },
]

const ageData = [
	{ name: '<20', Count: 1756 },
	{ name: '20-24', Count: 33596 },
	{ name: '25-29', Count: 78800 },
	{ name: '30-34', Count: 89426 },
	{ name: '35-39', Count: 187657 },
	{ name: '40-44', Count: 216806 },
	{ name: '45-49', Count: 216024 },
	{ name: '50-54', Count: 190226 },
	{ name: '55-59', Count: 146872 },
	{ name: '60-64', Count: 84865 },
	{ name: '65+', Count: 39494 },
]

export default function Spending() {
	return (
		<Page>
			<Head>
				<title>Federal Spending</title>
				<meta name="description" content="A look at how federal spending is allocated across departments" />
			</Head>
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
								<NoSSR>
									<BarList
										className="h-40"
										data={tenureData}
										valueFormatter={(value) => Intl.NumberFormat('en-US', {
											notation: 'compact',
										}).format(Number(value))}
									/>
								</NoSSR>
							</div>
						</div>

						<div>
							<h3 className="font-medium mb-2">Age</h3>
							<p className="text-sm text-gray-600">The average employee is 45 years old</p>
							<div className="mt-4">
								<NoSSR>
									<BarChart
										className="h-40"
										data={ageData}
										index="name"
										showLegend={false}
										categories={["Count"]}
										showGridLines={false}
										valueFormatter={(value) => Intl.NumberFormat('en-US', {
											notation: 'compact',
										}).format(Number(value))}
									/>
								</NoSSR>
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
					<H2>Government Departments explained</H2>
					<DepartmentList />
				</Section>
			</PageContent>

		</Page>
	);
}
