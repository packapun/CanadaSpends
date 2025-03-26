"use client"

import { InternalLink } from "@/components/Layout";

interface DepartmentProps {
  name: string;
  slug: string;
}

const DepartmentItem = ({ name, slug }: DepartmentProps) =>
  <div className="py-3 border-b border-gray-200">
    <InternalLink href={`/spending/${slug}`} className="font-medium text-gray-600">{name}</InternalLink>
  </div>


export const departments = [
  {
    name: "Finance Canada",
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
    name: "Crown-Indigenous Relations and Northern Affairs Canada",
    slug: "cirnac",
    href: "/spending/indigenous-services-and-northern-affairs",
    Percentage: 3.19
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
  },
  {
    name: "Innovation, Science and Industry",
    slug: "innovation-science-and-industry",
    href: "/spending/innovation-science-and-industry",
    Percentage: 2.0
  },
  {
    name: "Public Services and Procurement Canada",
    slug: "public-services-and-procurement-canada",
    href: "/spending/public-services-and-procurement-canada",
    Percentage: 1.6
  },
  {
    name: "Immigration, Refugees and Citizenship",
    slug: "immigration-refugees-and-citizenship",
    href: "/spending/immigration-refugees-and-citizenship",
    Percentage: 1.2
  },
  {
    name: "Veterans Affairs",
    slug: "veterans-affairs",
    href: "/spending/veterans-affairs",
    Percentage: 1.2
  },
  {
    name: "Transport Canada",
    slug: "transport-canada",
    href: "/spending/transport-canada",
    Percentage: 1.0
  },
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
    <div className="py-3 border-b border-gray-200">
      More coming soon...
    </div>
  </div>
}