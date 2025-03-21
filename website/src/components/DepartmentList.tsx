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


const departments = [
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

export const DepartmentList = () => {
  return <div className="text-gray-600 leading-relaxed mb-4">
    {departments.map((department) => <DepartmentItem key={department.slug} {...department} />)}
  </div>
}