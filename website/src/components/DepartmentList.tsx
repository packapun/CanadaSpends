"use client"

import Link from "next/link";

interface DepartmentProps {
  name: string;
  slug: string;
}

const DepartmentItem = ({ name, slug }: DepartmentProps) =>
  <div className="py-3 border-b border-gray-200">
    <Link href={`/spending/${slug}`} className="font-medium">{name}</Link>
  </div>


export const departments = [
  {
    name: "Department of Finance",
    slug: "department-of-finance",
    href: "/spending/department-of-finance",
    amount: 136.10,
    Percentage: 26.48
  },
  {
    name: "Employment and Social Development Canada",
    slug: "employment-and-social-development-canada",
    href: "/spending/employment-and-social-development-canada",
    amount: 94.48,
    Percentage: 18.38
  },
  {
    name: "Indigenous Services Canada",
    slug: "indigenous-services-and-northern-affairs",
    href: "/spending/indigenous-services-and-northern-affairs",
    amount: 46.55,
    Percentage: 9.06
  },
  {
    name: "National Defence",
    slug: "national-defence",
    href: "/spending/national-defence",
    amount: 34.49,
    Percentage: 6.71
  },
  {
    name: "Global Affairs Canada",
    slug: "global-affairs-canada",
    href: "/spending/global-affairs-canada",
    amount: 19.20,
    Percentage: 3.74
  },
  {
    name: "Canada Revenue Agency",
    slug: "canada-revenue-agency",
    href: "/spending/canada-revenue-agency",
    amount: 16.80,
    Percentage: 3.27
  },
  {
    name: "Housing, Infrastructure and Communities Canada",
    slug: "housing-infrastructure-communities",
    href: "/spending/housing-infrastructure-communities",
    amount: 14.50,
    Percentage: 2.82
  },
  {
    name: "Public Safety Canada",
    slug: "public-safety-canada",
    href: "/spending/public-safety-canada",
    amount: 13.91,
    Percentage: 2.71
  },
  {
    name: "Health Canada",
    slug: "health-canada",
    href: "/spending/health-canada",
    amount: 13.71,
    Percentage: 2.67
  }
]

export const DepartmentList = (props: { current?: string }) => {
  return <div className="text-gray-600 leading-relaxed mb-4">
    {departments.filter(d => d.name !== props.current).map((department) => <DepartmentItem key={department.slug} {...department} />)}
  </div>
}