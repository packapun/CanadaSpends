import {
	ChartConfig
} from "@/components/Chart";
import StatCard from "@/components/StatCard";

const chartData = [
	{ id: "finance", department: "Department of Finance", amount: 186 },
	{ id: "employment", department: "Department of Employment and Social Development", amount: 142 },
	{ id: "indigenous-services", department: "Department of Indigenous Services", amount: 98 },
	{ id: "defence", department: "Department of National Defence", amount: 167 },
	{ id: "foreign-affairs", department: "Department of Foreign Affairs, Trade and Development", amount: 89 },
	{ id: "revenue", department: "Canada Revenue Agency", amount: 112 },
	{ id: "crown-indigenous", department: "Department of Crown-Indigenous Relations and Northern Affairs", amount: 76 },
	{ id: "housing", department: "Department of Housing, Infrastructure and Communities", amount: 156 },
	{ id: "public-safety", department: "Department of Public Safety and Emergency Preparedness", amount: 92 },
	{ id: "other", department: "Other", amount: 134 },
]

const chartConfig = {
	finance: {
		label: "Department of Finance",
		color: "hsl(var(--chart-1))",
	},
	employment: {
		label: "Department of Employment and Social Development",
		color: "hsl(var(--chart-2))",
	},
	indigenous: {
		label: "Department of Indigenous Services",
		color: "hsl(var(--chart-3))",
	},
	defence: {
		label: "Department of National Defence",
		color: "hsl(var(--chart-4))",
	},
	foreign: {
		label: "Department of Foreign Affairs, Trade and Development",
		color: "hsl(var(--chart-5))",
	},
	revenue: {
		label: "Canada Revenue Agency",
		color: "hsl(var(--chart-6))",
	},
	crown: {
		label: "Department of Crown-Indigenous Relations and Northern Affairs",
		color: "hsl(var(--chart-7))",
	},
	housing: {
		label: "Department of Housing, Infrastructure and Communities",
		color: "hsl(var(--chart-8))",
	},
	"public-safety": {
		label: "Department of Public Safety and Emergency Preparedness",
		color: "hsl(var(--chart-9))",
	},
	other: {
		label: "Other",
		color: "hsl(var(--chart-10))",
	},
} satisfies ChartConfig


export default function Department() {
	return <>
		<div className="min-h-screen bg-[#f8fafc]">
			<div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
				<section className="fade-in">
					<div className="max-w-[800px] mx-auto">
						<h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
							Department of Finance
						</h1>
						<p className="mt-4 text-gray-600 text-lg leading-relaxed">
							The Department of Finance (Finance Canada) is a central federal agency
							responsible for overseeing the nation's economic and fiscal policies, ensuring
							financial stability, and managing the government's fiscal framework.
							Established in 1867 as one of the original departments following
							Confederation, it advises the Prime Minister and Cabinet on economic matters,
							develops tax and tariff policies, and prepares the annual federal budget.
						</p>
						<div className="mt-3 text-sm text-gray-500">
							Data updated March 20, 2025
						</div>
					</div>

					<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
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
					</div>

					<div className="mt-16 max-w-[800px] mx-auto">
						<h2 className="text-3xl font-bold tracking-tight slide-up slide-up-delay-1">
							How much does the Department of Finance spend?
						</h2>
						<p className="mt-4 text-gray-600 leading-relaxed slide-up slide-up-delay-1">
							The Department of Finance spent $136.1 billion in fiscal year (FY) 2024. This
							was 26.4% of the $513.9 billion in overall federal spending. The department
							ranked first among federal departments in total spending.
						</p>
					</div>

					<div className="mt-12 max-w-[800px] mx-auto bg-white rounded-xl p-8 shadow-chart slide-up slide-up-delay-2">
						<h2 className="text-xl font-bold mb-6">
							The Department of Finance accounted for 26.4% of all federal spending in FY 2024.
						</h2>
						<p className="text-gray-600 mb-8">
							10 government departments accounted for 73.2% of federal spending in FY 2024
						</p>


					</div>

				</section>
			</div>
		</div>
	</>
}