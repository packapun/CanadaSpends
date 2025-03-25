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
    Percentage: 26.48
  },
  {
    name: "Employment and Social Development Canada",
    slug: "employment-and-social-development-canada",
    href: "/spending/employment-and-social-development-canada",
    Percentage: 18.38
  },
  {
    name: "Indigenous Services Canada",
    slug: "indigenous-services-and-northern-affairs",
    href: "/spending/indigenous-services-and-northern-affairs",
    Percentage: 9.06
  },
  {
    name: "Crown-Indigenous Relations and Northern Affairs Canada",
    Percentage: 3.19
  },
  {
    name: "National Defence",
    slug: "national-defence",
    href: "/spending/national-defence",
    Percentage: 6.71
  },
  {
    name: "Global Affairs Canada",
    slug: "global-affairs-canada",
    href: "/spending/global-affairs-canada",
    Percentage: 3.74
  },
  {
    name: "Canada Revenue Agency",
    slug: "canada-revenue-agency",
    href: "/spending/canada-revenue-agency",
    Percentage: 3.27
  },
  {
    name: "Housing, Infrastructure and Communities Canada",
    slug: "housing-infrastructure-communities",
    href: "/spending/housing-infrastructure-communities",
    Percentage: 2.82
  },
  {
    name: "Public Safety Canada",
    slug: "public-safety-canada",
    href: "/spending/public-safety-canada",
    Percentage: 2.71
  },
  {
    name: "Health Canada",
    slug: "health-canada",
    href: "/spending/health-canada",
    Percentage: 2.67
  }
].sort((a, b) => b.Percentage - a.Percentage)

const BrowsableDepartment = departments.filter(d => !!d.href && !!d.slug) as {
  name: string;
  slug: string;
}[]

export const DepartmentList = (props: { current?: string }) => {
  return <div className="text-gray-600 leading-relaxed mb-4">
    {BrowsableDepartment.filter(d => {
      return d.name !== props.current
    }).map((department) => <DepartmentItem key={department.slug} {...department} />)}
  </div>
}