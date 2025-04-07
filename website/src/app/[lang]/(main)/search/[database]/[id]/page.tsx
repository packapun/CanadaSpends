import dynamic from 'next/dynamic'

export default async function Page({ params }: { params: { id: string, database: string } }) {
  const { id, database } = await params

  const componentMap: Record<string, React.ComponentType<{ id: string }>> = {
    'aggregated-contracts-under-10k': AggregatedContractsUnder10k,
    'contracts-over-10k': ContractsOver10k,
    'cihr_grants': CIHRGrants,
    'nserc_grants': NSERCGrants,
    'sshrc_grants': SSHRCGrants,
    'global_affairs_grants': GlobalAffairsGrants,
    'transfers': Transfers,
  }

  const Component = componentMap[database]
  if (!Component) return notFound()

  return <Component id={id} />
}

import { notFound } from 'next/navigation'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {H1, H2} from "@/components/Layout";
import {Badge} from "@/components/badge";

interface Props {
  id: string
}

const BASE = 'https://api.canadasbuilding.com/canada-spends'

function jsonFetcher(url: string) {
  return fetch(url, { cache: 'no-store' })
    .then(res => res.ok ? res.json() : null)
}

async function BaseSpendingPage({ id, database, label }: Props & { database: string, label: string }) {
  const url = `${BASE}/${database}/${id}.json?_shape=array`
  console.log({url})
  const data = await jsonFetcher(url)
  // const summary = await jsonFetcher(url)
  // if (!data || data.length === 0) return notFound()
  const record = data[0]

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{label}: {record.program}</h1>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold">
              {record.title}
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
            <KeyValueTable record={record} />
        </CardContent>
      </Card>
      {record.source_url && (
        <div className="mt-4">
          <a href={record.source_url as string} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            View original record
          </a>
        </div>
      )}
    </main>
  )
}



function KeyValueTable({ record }: { record: Record<string, unknown> }) {
  return (
    <table className="w-full border border-gray-300 text-sm">
      <tbody>
        {Object.entries(record).map(([key, value]) => (
          <tr key={key} className="even:bg-gray-50">
            <td className="border p-2 font-medium align-top whitespace-nowrap">{key}</td>
            <td className="border p-2 break-all">{String(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

async function DetailsPage({
  type,
  summary,
  program,
  title,
  award_amount,
  fiscal_year,
  source_url,
  recipient,
  extraFields = [],
  keywords = [],
}: {
  type: string,
  program: string,
  award_amount: number,
  source_url: string,
  fiscal_year: string,
  title: string,
  recipient: string,
  summary: string,
  extraFields?: { label: string, value: unknown }[]
  keywords?: string[]
}) {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-semibold leading-tight max-w-2xl mb-4">
        {type}: {program}
      </h1>
      <div className="rounded-2xl border p-6 shadow-sm bg-white">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold">{recipient}</h2>
          <div className="text-right text-lg font-bold text-green-700 whitespace-nowrap">
            ${Number(award_amount).toLocaleString()}
          </div>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-xs text-gray-500 mb-4 font-bold">FY {fiscal_year}</p>
        <div className="font-bold text-gray-900">Summary</div>
        <div className="text-sm text-gray-700 mb-4 whitespace-pre-wrap">
          {(summary || '—')}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-2 text-sm">
          {extraFields.map(({ label, value }) => (
            <Detail key={label} label={label} value={value} />
          ))}
        </div>
        {keywords.length > 0 && (
          <>
            <div className="font-bold text-gray-900 mt-2">Keywords</div>
            <div>
              {keywords.map((kw: string) => (
                <Badge className="mr-1" variant="outline" key={kw}>{kw}</Badge>
              ))}
            </div>
          </>
        )}
        <div className="mt-6">
          <a href={source_url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            View original record site
          </a>
        </div>
      </div>
    </main>
  )
}

async function NSERCGrants({ id }: Props) {
  const url = `${BASE}/nserc_grants/${id}.json?_shape=array`
  const data = await jsonFetcher(url)
  if (!data || data.length === 0) return notFound()
  const grant = data[0]

  return (
    <DetailsPage
      fiscal_year={grant.fiscal_year}
      title={grant.title}
      source_url={grant.source_url}
      recipient={grant.institution}
      award_amount={grant.award_amount}
      program={grant.program}
      type="NSERC Research Grants"
      summary={grant.award_summary}
      extraFields={[
        { label: "Awarded", value: grant.competition_year },
        { label: "Installment", value: grant.installment },
        { label: "Principal Investigator", value: grant.project_lead_name },
        { label: "Institution", value: grant.institution },
        { label: "Department", value: grant.department },
        { label: "Province", value: grant.province },
        { label: "Competition Year", value: grant.competition_year },
        { label: "Fiscal Year", value: grant.fiscal_year },
        { label: "Selection Committee", value: grant.selection_committee },
        { label: "Research Subject", value: grant.research_subject },
        { label: "Application ID", value: grant.application_id }
      ]}
    />
  )
}

async function CIHRGrants({ id }: Props) {
  const url = `${BASE}/cihr_grants/${id}.json?_shape=array`
  const data = await jsonFetcher(url)
  if (!data || data.length === 0) return notFound()
  const grant = data[0]

  return (
    <DetailsPage
      fiscal_year={grant.competition_year.slice(0,4)}
      title={grant.title}
      source_url={grant.source_url}
      recipient={grant.institution}
      award_amount={grant.award_amount}
      program={grant.program}
      type="CIHR Research Grant"
      summary={grant.abstract?.replaceAll("\n", "\n\n")}
      keywords={grant.keywords.split(";")}
      extraFields={[
        { label: "Principal Investigator", value: grant.project_lead_name },
        { label: "Institution", value: grant.institution },
        { label: "Province", value: grant.province },
        { label: "Duration", value: grant.duration },
        { label: "Competition Year", value: grant.competition_year },
        { label: "Program Type", value: grant.program_type },
        { label: "Theme", value: grant.theme },
        { label: "Research Subject", value: grant.research_subject },
        { label: "External ID", value: grant.external_id }
      ]}
    />
  )
}

function Detail({ label, value }: { label: string, value: unknown }) {
  return (
    <div>
      <div className="font-bold text-gray-900">{label}</div>
      <div className="text-gray-700">{String(value || '—')}</div>
    </div>
  )
}

export const AggregatedContractsUnder10k = (props: Props) => <BaseSpendingPage {...props} database="aggregated-contracts-under-10k" label="Contracts Under $10k Summary" />
export const ContractsOver10k = (props: Props) => <BaseSpendingPage {...props} database="contracts-over-10k" label="Contracts Over $10k" />
export const SSHRCGrants = (props: Props) => <BaseSpendingPage {...props} database="sshrc_grants" label="SSHRC Research Grants" />
export const GlobalAffairsGrants = (props: Props) => <BaseSpendingPage {...props} database="global_affairs_grants" label="Global Affairs Grants" />
export const Transfers = (props: Props) => <BaseSpendingPage {...props} database="transfers" label="Federal Transfers" />
