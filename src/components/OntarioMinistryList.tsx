"use client"

import { InternalLink } from "@/components/Layout";
import { Trans, useLingui } from "@lingui/react/macro";

interface MinistryProps {
  name: string;
  slug: string;
}

const MinistryItem = ({ name, slug }: MinistryProps) => {
  const { i18n } = useLingui()
  return <div className="py-3 border-b border-gray-200">
    <InternalLink href={`/${i18n.locale}/ontario/${slug}`} className="font-medium text-gray-600">{name}</InternalLink>
  </div>
}

export const OntarioMinistryList = (props: { current?: string }) => {
  
  const ministries = [
    { name: "Agriculture, Food and Rural Affairs", slug: "agriculture-food-and-rural-affairs" },
    { name: "Attorney General", slug: "attorney-general" },
    { name: "Cabinet Office", slug: "cabinet-office" },
    { name: "Children, Community and Social Services", slug: "children-community-and-social-services" },
    { name: "Citizenship and Multiculturalism", slug: "citizenship-and-multiculturalism" },
    { name: "Colleges and Universities", slug: "colleges-and-universities" },
    { name: "Economic Development, Job Creation and Trade", slug: "economic-development-job-creation-and-trade" },
    { name: "Education", slug: "education" },
    { name: "Energy", slug: "energy" },
    { name: "Environment, Conservation and Parks", slug: "environment-conservation-and-parks" },
    { name: "Finance", slug: "finance" },
    { name: "Francophone Affairs", slug: "francophone-affairs" },
    { name: "Health", slug: "health" },
    { name: "Indigenous Affairs", slug: "indigenous-affairs" },
    { name: "Infrastructure", slug: "infrastructure" },
    { name: "Labour, Immigration, Training and Skills Development", slug: "labour-immigration-training-and-skills-development" },
    { name: "Long-Term Care", slug: "long-term-care" },
    { name: "Mines", slug: "mines" },
    { name: "Municipal Affairs and Housing", slug: "municipal-affairs-and-housing" },
    { name: "Natural Resources and Forestry", slug: "natural-resources-and-forestry" },
    { name: "Northern Development", slug: "northern-development" },
    { name: "Office of the Assembly", slug: "office-of-the-assembly" },
    { name: "Office of the Auditor General", slug: "office-of-the-auditor-general" },
    { name: "Office of the Chief Electoral Officer", slug: "office-of-the-chief-electoral-officer" },
    { name: "Office of the Lieutenant Governor", slug: "office-of-the-lieutenant-governor" },
    { name: "Office of the Premier", slug: "office-of-the-premier" },
    { name: "Ombudsman Ontario", slug: "ombudsman-ontario" },
    { name: "Public and Business Service Delivery", slug: "public-and-business-service-delivery" },
    { name: "Seniors and Accessibility", slug: "seniors-and-accessibility" },
    { name: "Solicitor General", slug: "solicitor-general" },
    { name: "Tourism, Culture, and Sport", slug: "tourism-culture-and-sport" },
    { name: "Transportation", slug: "transportation" },
    { name: "Treasury Board Secretariat", slug: "treasury-board-secretariat" }
  ].sort((a, b) => a.name.localeCompare(b.name));

  return <div className="text-gray-600 leading-relaxed mb-4">
    {ministries.filter(m => {
      return (m.name !== props.current) && (m.slug !== props.current)
    }).map((ministry) => <MinistryItem key={ministry.slug} {...ministry} />)}
    <div className="py-3 border-b border-gray-200">
      <Trans>More coming soon...</Trans>
    </div>
  </div>
} 