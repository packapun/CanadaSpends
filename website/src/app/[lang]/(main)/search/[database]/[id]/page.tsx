import dynamic from 'next/dynamic'


import { notFound } from 'next/navigation'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DetailsPage} from "./DetailsPage";
import {ContractsOver10k} from "./Contracts";

interface Props {
  id: string
  database: string
}

export default async function Page({ params }: { params: { id: string, database: string } }) {
  const { id, database } = await params

  const componentMap: Record<string, React.ComponentType<{ id: string, database: string }>> = {
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

  return <Component id={id} database={database} />
}


const BASE = 'https://api.canadasbuilding.com/canada-spends'

function jsonFetcher(url: string) {
  return fetch(url, { cache: 'no-store' })
    .then(res => res.ok ? res.json() : null)
}

async function BaseSpendingPage({ id, database, label }: Props & { database: string, label: string }) {
  const url = `${BASE}/${database}/${id}.json?_shape=array`
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

async function NSERCGrants({ id, database }: Props & { database: string }) {
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
      database={database}
    >
      <Detail label="Awarded" value={grant.competition_year} />
      <Detail label="Installment" value={grant.installment} />
      <Detail label="Principal Investigator" value={grant.project_lead_name} />
      <Detail label="Institution" value={grant.institution} />
      <Detail label="Department" value={grant.department} />
      <Detail label="Province" value={grant.province} />
      <Detail label="Competition Year" value={grant.competition_year} />
      <Detail label="Fiscal Year" value={grant.fiscal_year} />
      <Detail label="Selection Committee" value={grant.selection_committee} />
      <Detail label="Research Subject" value={grant.research_subject} />
      <Detail label="Application ID" value={grant.application_id} />
    </DetailsPage>
  )
}

async function CIHRGrants({ id, database }: Props & { database: string }) {
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
      database={database}
    >
      <Detail label="Principal Investigator" value={grant.project_lead_name} />
      <Detail label="Institution" value={grant.institution} />
      <Detail label="Province" value={grant.province} />
      <Detail label="Duration" value={grant.duration} />
      <Detail label="Competition Year" value={grant.competition_year} />
      <Detail label="Program Type" value={grant.program_type} />
      <Detail label="Theme" value={grant.theme} />
      <Detail label="Research Subject" value={grant.research_subject} />
      <Detail label="External ID" value={grant.external_id} />
    </DetailsPage>
  )
}

async function SSHRCGrants({ id, database }: Props & { database: string }) {
  const url = `${BASE}/sshrc_grants/${id}.json?_shape=array`
  const data = await jsonFetcher(url)
  if (!data || data.length === 0) return notFound()
  const grant = data[0]

  return (
    <DetailsPage
      fiscal_year={grant.fiscal_year}
      title={grant.title}
      source_url={grant.source_url}
      recipient={grant.applicant}
      award_amount={grant.amount}
      program={grant.program}
      type="SSHRC Research Grant"
      summary=""
      keywords={grant.keywords.replaceAll('["', '').replaceAll('"]', '').split("\\n")}
      database={database}
    >
      <Detail label="Principal Applicant" value={grant.applicant} />
      <Detail label="Organization" value={grant.organization} />
      <Detail label="Co-Applicant(s)" value={grant.co_applicant} />
      <Detail label="Competition Year" value={grant.competition_year} />
      <Detail label="Fiscal Year" value={grant.fiscal_year} />
      <Detail label="Discipline" value={grant.discipline} />
      <Detail label="Area of Research" value={grant.area_of_research} />
    </DetailsPage>
  )
}

async function GlobalAffairsGrants({ id, database }: Props & { database: string }) {
  const url = `${BASE}/global_affairs_grants/${id}.json?_shape=array`
  const data = await jsonFetcher(url)
  if (!data || data.length === 0) return notFound()
  const grant = data[0]

  // Parse DAC sectors if they're in JSON string format
  let dacSectors: string[] = []
  try {
    if (grant.DACSectors) {
      const parsed = JSON.parse(grant.DACSectors)
      dacSectors = Array.isArray(parsed) ? parsed : []
    }
  } catch (e) {
    dacSectors = grant.DACSectors ? [grant.DACSectors] : []
  }

  // Parse policy markers if they're in JSON string format
  let policyMarkers: string[] = []
  try {
    if (grant.policyMarkers) {
      const parsed = JSON.parse(grant.policyMarkers)
      policyMarkers = Array.isArray(parsed) ? parsed : []
    }
  } catch (e) {
    policyMarkers = grant.policyMarkers ? [grant.policyMarkers] : []
  }

  // Combine all keywords for display
  const keywords = [...dacSectors, ...policyMarkers]

  return (
    <DetailsPage
      fiscal_year={new Date(grant.start).getFullYear().toString()}
      title={grant.title}
      source_url={grant.source_url || ""}
      recipient={grant.executingAgencyPartner || ""}
      award_amount={parseFloat(grant.maximumContribution)}
      program={grant.programName || ""}
      type="Global Affairs Grant"
      summary={grant.description}
      keywords={keywords}
      database={database}
    >
      <Detail label="Project Number" value={grant.projectNumber} />
      <Detail label="Status" value={grant.status} />
      <Detail label="Start Date" value={new Date(grant.start).toLocaleDateString()} />
      <Detail label="End Date" value={new Date(grant.end).toLocaleDateString()} />
      <Detail label="Countries" value={grant.countries} />
      <Detail label="Executing Agency/Partner" value={grant.executingAgencyPartner} />
      <Detail label="Maximum Contribution" value={`$${parseFloat(grant.maximumContribution).toLocaleString()}`} />
      <Detail label="Contributing Organization" value={grant.ContributingOrganization} />
      <Detail className="col-span-full" label="Expected Results" value={grant.expectedResults} />
      <Detail className="col-span-full" label="Results Achieved" value={grant.resultsAchieved} />
      <Detail label="Aid Type" value={grant.aidType} />
      <Detail label="Collaboration Type" value={grant.collaborationType} />
      <Detail label="Finance Type" value={grant.financeType} />
      <Detail label="Reporting Organization" value={grant.reportingOrganisation} />
      <Detail label="Program Name" value={grant.programName} />
      <Detail label="Selection Mechanism" value={grant.selectionMechanism} />
      <Detail label="Regions" value={grant.regions?.replace(/[\[\]"]/g, '')} />
    </DetailsPage>
  )
}

async function Transfers({ id, database }: Props & { database: string }) {
  const url = `${BASE}/transfers/${id}.json?_shape=array`
  const data = await jsonFetcher(url)
  if (!data || data.length === 0) return notFound()
  const transfer = data[0]

  const fiscalYear = transfer.FSCL_YR || '—'
  const ministry = transfer.MINE || transfer.MINC || transfer.MINF || '—'
  const recipient = transfer.RCPNT_NML_EN_DESC || '—'
  const amount = transfer.AGRG_PYMT_AMT || 0
  const location = [
    transfer.CTY_EN_NM,
    transfer.PROVTER_EN,
    transfer.CNTRY_EN_NM
  ].filter(Boolean).join(', ') || '—'

  // Define the constant URL for the dataset page
  const datasetPageUrl = "https://open.canada.ca/data/en/dataset/69bdc3eb-e919-4854-bc52-a435a3e19092";

  return (
    <>
      <DetailsPage
        fiscal_year={fiscalYear}
        title={transfer.RCPNT_CLS_EN_DESC || '—'}
        source_url={datasetPageUrl}
        recipient={recipient}
        award_amount={amount}
        program={transfer.DEPT_EN_DESC || '—'}
        type="Federal Transfer"
        summary=""
        database={database}
      >
        <Detail label="Department" value={transfer.DEPT_EN_DESC} />
        <Detail label="Ministry" value={ministry} />
        <Detail label="Fiscal Year" value={fiscalYear} />
        <Detail label="Recipient Class" value={transfer.RCPNT_CLS_EN_DESC} />
        <Detail label="Recipient" value={recipient} />
        <Detail label="Location" value={location} />
        <Detail label="Payment Amount" value={`$${Number(amount).toLocaleString()}`} />
      </DetailsPage>
    </>
  )
}


function Detail({ label, value, className }: { label: string, value: unknown, className?: string }) {
  return (
    <div className={className}>
      <div className="font-bold text-gray-900">{label}</div>
      <div className="text-gray-700">{String(value || '—')}</div>
    </div>
  )
}

export const AggregatedContractsUnder10k = (props: Props) => <BaseSpendingPage {...props} database="aggregated-contracts-under-10k" label="Contracts Under $10k Summary" />
