"use client"

import { InternalLink } from "@/components/Layout";
import { Trans, useLingui } from "@lingui/react/macro";

interface DepartmentProps {
  name: string;
  slug: string;
}

const DepartmentItem = ({ name, slug }: DepartmentProps) =>
  <div className="py-3 border-b border-gray-200">
    <InternalLink href={`/spending/${slug}`} className="font-medium text-gray-600">{name}</InternalLink>
  </div>


export const useDepartments = () => {
  const { t } = useLingui()
  return [
    {
      name: t`Department of Finance`,
      slug: "department-of-finance",
      href: "/spending/department-of-finance",
      Percentage: 26.48
    },
    {
      name: t`Employment and Social Development Canada`,
      slug: "employment-and-social-development-canada",
      href: "/spending/employment-and-social-development-canada",
      Percentage: 18.38
    },
    {
      name: t`Indigenous Services Canada + Crown-Indigenous Relations and Northern Affairs Canada`,
      slug: "indigenous-services-and-northern-affairs",
      href: "/spending/indigenous-services-and-northern-affairs",
      Percentage: 12.25
    },
    {
      name: t`National Defence`,
      slug: "national-defence",
      href: "/spending/national-defence",
      Percentage: 6.71
    },
    {
      name: t`Global Affairs Canada`,
      slug: "global-affairs-canada",
      href: "/spending/global-affairs-canada",
      Percentage: 3.74
    },
    {
      name: t`Canada Revenue Agency`,
      slug: "canada-revenue-agency",
      href: "/spending/canada-revenue-agency",
      Percentage: 3.27
    },
    {
      name: t`Housing, Infrastructure and Communities Canada`,
      slug: "housing-infrastructure-communities",
      href: "/spending/housing-infrastructure-communities",
      Percentage: 2.82
    },
    {
      name: t`Public Safety Canada`,
      slug: "public-safety-canada",
      href: "/spending/public-safety-canada",
      Percentage: 2.71
    },
    {
      name: t`Health Canada`,
      slug: "health-canada",
      href: "/spending/health-canada",
      Percentage: 2.67
    },
    {
      name: t`Innovation, Science and Industry`,
      slug: "innovation-science-and-industry",
      href: "/spending/innovation-science-and-industry",
      Percentage: 2.0
    },
    {
      name: t`Public Services and Procurement Canada`,
      slug: "public-services-and-procurement-canada",
      href: "/spending/public-services-and-procurement-canada",
      Percentage: 1.6
    },
    {
      name: t`Immigration, Refugees and Citizenship`,
      slug: "immigration-refugees-and-citizenship",
      href: "/spending/immigration-refugees-and-citizenship",
      Percentage: 1.2
    },
    {
      name: t`Veterans Affairs`,
      slug: "veterans-affairs",
      href: "/spending/veterans-affairs",
      Percentage: 1.2
    },
    {
      name: t`Transport Canada`,
      slug: "transport-canada",
      href: "/spending/transport-canada",
      Percentage: 1.0
    },
  ].sort((a, b) => b.Percentage - a.Percentage)
}



export const DepartmentList = (props: { current?: string }) => {
  const departments = useDepartments()
  const BrowsableDepartment = departments.filter(d => !!d.href && !!d.slug) as {
    name: string;
    slug: string;
  }[]

  return <div className="text-gray-600 leading-relaxed mb-4">
    {BrowsableDepartment.filter(d => {
      return d.name !== props.current
    }).map((department) => <DepartmentItem key={department.slug} {...department} />)}
    <div className="py-3 border-b border-gray-200">
      <Trans>More coming soon...</Trans>
    </div>
  </div>
}