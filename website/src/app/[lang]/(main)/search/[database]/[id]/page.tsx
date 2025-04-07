import dynamic from 'next/dynamic'


import { notFound } from 'next/navigation'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DetailsPage} from "./DetailsPage";
import {ContractsOver10k} from "./Contracts";

interface Props {
  id: string
}

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

// 1		Reference Number
// 		ID	reference_number
// 		Description	"It is a unique identifier given to each line item in the spreadsheet. Having a unique identifier for each
// item will allow users to locate a specific item should they need to modify or delete."
//
// 2		Procurement Identification Number
// 		ID	procurement_id
// 		Description	"It is recommended that the procurement identification number be the contract number. Alternatively, the
// procurement identification number may be the commitment number or requisition number if this is the standard
// practice in the department."
// 		Validation	Mandatory for contracts after 2019-01-01
//
// 3		Vendor Name
// 		ID	vendor_name
// 		Description	"It is recommended that the vendor name be the legal name of the contractor, as indicated on the contract.
// Alternatively, the vendor name may be the name in the financial system if this is the standard practice in
// the department."
// 		Validation	Mandatory for contracts after 2019-01-01
//
// 4		Vendor Postal Code
// 		ID	vendor_postal_code
// 		Description	"i. It is recommended that this field be populated with the first three digits of the postal code for the
// vendor identified in the contract.
// ii. Alternatively, the vendor postal code may be the first three digits of the postal code identified in the
// procurement or financial system if this is the standard practice in the department.
// iii. This field is to be populated with “NA” if the vendor is located outside of Canada, as the value “NA”
// for this field indicates not applicable."
// 		Validation	"Mandatory for contracts after 2022-01-01
// This field must contain the first three digits of a postal code in A1A format or the value “NA”"
//
// 5		Buyer Name
// 		ID	buyer_name
// 		Description	"i. It is recommended that the field be populated with the name of the buyer, as indicated on the original
// contract or, alternatively, the individual responsible for the procurement at the department.
// ii. For the establishment of a standing offer or supply arrangement agreement, it is recommended that this
// field be populated with the name of the buyer that issued the original standing offer or supply arrangement
// agreement.
// iii. For a call-up contract against a standing offer or supply arrangement, this field should be the name of
// the buyer identified in the original call-up contract.
// iv. For a contract with task authorizations, this field may be populated with the name of the buyer
// indicated in the original contract or in the individual task authorization.
// v. For amendments, it is recommended that this field be populated with the value “NA,” as the value “NA” for
// this field indicates not applicable.
// vi. For contracts awarded by PSPC or Shared Services Canada (SSC) on behalf of the client department, it is
// recommended that this field be populated with the name of the PSPC or SSC contracting authority. If this is
// not available, indicate the values, “PSPC-SPAC” or “SSC-SPC” as applicable."
// 		Validation	"Mandatory for contracts after 2022-01-01
// This field must be populated with an NA if an amendment is reported under Instrument Type."
//
// 6		Contract Date
// 		ID	contract_date
// 		Description	"i. It is recommended that the contract date be the date the contract is awarded by the government.
// Alternatively, the contract date may be the hard commitment date (the date that the financial commitment is
// recorded in the departmental financial system) if this is the standard practice in the department.
// ii. It is recommended that the contract date for a contract with task authorizations be the date that the
// contract is awarded (or the hard commitment date) for the contract. When the full value of the contract with
// task authorizations is likely not to be used, the contract date for each task authorization may be the date
// that each task authorization is issued (or the hard commitment date).
// iii. It is recommended that the contract date for an amended contract or the exercising of an option be the
// date that the contract is awarded (or the hard commitment date).
// iv. It is recommended that the contract date for a confirming order be the date of the verbal contract for
// goods, services or an amendment. If the date of the verbal contract cannot be determined, the contract date
// may be the date that the confirming order is issued."
//
// 7		Economic Object Code
// 		ID	economic_object_code
// 		Description	"i. It is recommended that this field be populated with the contract’s numeric economic object code. Economic
// object codes are listed in the government-wide chart of accounts. The use of accurate economic object codes
// is important for maintaining the integrity of the Public Accounts of Canada. Departments are to ensure that
// all expenditures are coded appropriately in accordance with the Directive on Accounting Standards: GC 5000
// Recording Financial Transactions in the Accounts of Canada.
// ii. For standing offers and supply arrangement agreements, this field may be populated with the data value
// “NA” as the value “NA” for this field means not applicable.
// iii. When a contract involves more than one economic object, it is recommended that the economic object
// associated with the largest dollar value be used. A department may use a different approach if this is the
// standard practice in the department."
// 		Validation	"Mandatory for contracts after 2019-01-01
// This field is limited to only 3 or 4 digits.
// If NA, then Instrument Type must be identified as a standing offer/supply arrangement (SOSA)."
//
// 8		Description of Work English
// 		ID	description_en
// 		Description	"It is recommended that this field be populated with the economic object code’s text description as listed in
// the government-wide chart of accounts ( http://www.tpsgc-pwgsc.gc.ca/recgen/pceaf-gwcoa/index-eng.html ).
// For standing offers and supply arrangement agreements, this field may be populated with the commodity code’s
// text description used by the federal government for procurement activities."
// 		Validation	Mandatory for contracts after 2019-01-01
//
// 9		Description of Work French
// 		ID	description_fr
// 		Description	"It is recommended that this field be populated with the economic object code’s text description as listed in
// the government-wide chart of accounts ( http://www.tpsgc-pwgsc.gc.ca/recgen/pceaf-gwcoa/index-eng.html ).
// For standing offers and supply arrangement agreements, this field may be populated with the commodity code’s
// text description used by the federal government for procurement activities."
// 		Validation	Mandatory for contracts after 2019-01-01
//
// 10		Contract Period Start Date
// 		ID	contract_period_start
// 		Description	"i. For a services or construction services contract, it is recommended that the contract period start date
// be the starting date for the period of time over which the services are provided.
// ii. For a standing or supply arrangement, it is recommended that this field be populated with the starting
// date for the period of time over which a call-up may be entered into.
// iii. For a contract with task authorizations, it is recommended that this field be populated with the
// starting date for the period of time over the entire contract. For a contract with task authorizations where
// the full value of a contract with task authorizations is likely not to be used, it is recommended for this
// field be populated with the starting date for each task authorization."
// 		Validation	"Mandatory for contracts after 2019-01-01
// If Commodity Type is a Service (S) or Construction (C) this field must not be empty and must be a valid
// date."
//
// 11		Contract Period End Date or Delivery Date
// 		ID	delivery_date
// 		Description	"i. For a goods contract, it is recommended that this field be the date when goods are to be delivered, which
// may be the contract period end date. The department may use the last delivery date if the contract involves
// multiple items on multiple dates.
// ii. For a services or construction services contract, it is recommended that this field be the end date for
// the period of time over which the services are provided.
// iii. For a standing offer or supply arrangement, it is recommended that this field be the end date for the
// period of time over which a call-up may be entered into.
// iv. For a contract with task authorizations, it is recommended that this field be populated with the end
// date for the period of time over the entire contract. For a contract with task authorizations where the full
// value of a contract with task authorization is likely not to be used, it is recommended for this field to be
// populated with the end date for each task authorization."
// 		Validation	Mandatory for contracts after 2019-01-01
//
// 12		Total Contract Value
// 		ID	contract_value
// 		Description	"i. It is recommended that the total contract value be the amount of the hard commitment recorded in the
// departmental financial system for all contracts and all subsequent amendments regardless of dollar value. It
// is recommended for this field be in Canadian currency and for it to include all applicable taxes.
// ii. For a multi-year contract, it is recommended for this field to be the total amount of the contract for
// all years.
// iii. For a contract amendment, it is recommended for this field to be the amended contract value.
// iv. For a contract with task authorizations, the full potential value of the contract may be reported upon
// contract award unless the full value is not expected to be used. In the latter situation, each task
// authorization may be reported individually or cumulatively. When a contract includes a fixed deliverable and
// another deliverable that requires a task authorization, the department may report the contract and task
// authorizations in any manner that is transparent.
// v. The value of this field for the reporting of a standing offer agreement or supply arrangement agreement
// is $0."
// 		Validation	Mandatory for contracts after 2019-01-01
//
// 13		Original Contract Value
// 		ID	original_value
// 		Description	"i. It is recommended that the original contract value be the amount of the hard commitment recorded in the
// departmental financial system at the time of contract award for a contract or amended contract. It is
// recommended for this field be in Canadian currency and for it to include all applicable taxes.
// ii. For a multi-year contract, it is recommended for this field to be the amount at the time of contract
// award for the multi-year contract period.
// iii. For a contract option, it is recommended for this field to be excluded from the original contract value
// and for it to be reported at a later date as an amendment when the contract option is exercised.
// Alternatively, the full value of a contract, including options, may be reported at the time of contract
// award.
// iv. For a contract with task authorizations, it is recommended that the original contract value be for the
// full amount of the contract rather than the amount specified within the minimum work guarantee clause. The
// full potential value of the contract may be reported in the original contract value unless the full value is
// not expected to be used. In the latter situation, each task authorization may be reported individually or
// cumulatively. When a contract includes a fixed deliverable and another deliverable that requires a task
// authorization, the department may report the contract and task authorizations in any manner that is
// transparent.
// v. The value of this field for the reporting of a standing offer agreement or supply arrangement agreement
// should be $0."
// 		Validation	Mandatory for contracts after 2019-01-01
//
// 14		Contract Amendment Value
// 		ID	amendment_value
// 		Description	"i. For an amendment, it is recommended that the contract amendment value be the value of the contract
// amendment. Negative amendments should include a minus sign in front of the value. It is recommended for this
// field to be in Canadian currency and for it to include all applicable taxes.
// ii. Multiple amendment(s) to a contract that take place in the same fiscal quarter may be reported either
// individually or combined. Positive or negative amendments over $10,000 are to be reported quarterly in
// accordance with Appendix A. Positive or negative amendments of $10,000 and under are to be reported annually
// via email to PSPC in accordance with Appendix A, and to be reported annually on the Open Government Portal
// in accordance with Appendix B. An amendment should be reported either quarterly or annually. Reporting an
// amendment both quarterly and annually would result in double counting of the amendment’s value when
// calculating the total contracting activity of an organization.
// iii. When a contract is entered into and subsequently amended in the same fiscal quarter, the two
// transactions should be reported separately. Entry into the contract should be reported as a separate entry
// with the value at contract entry in the original contract value and should not include the value of the
// contract amendment. The contract amendment should also be reported as a separate entry with the value of the
// amendment in the contract amendment value and the contract entry value in the original contract value.
// iv. For a contract with task authorizations, when the full value is likely not to be used, the value of any
// subsequent task authorization may be reported as an amendment with its value reported in the contract
// amendment value.
// v. A “0” value should be included if there are no amendments associated with the contract."
// 		Validation	This field must be populated if Amendment (A) was selected as the Instrument Type
//
// 15		Comments English
// 		ID	comments_en
// 		Description	"i. Standardized comments are recommended to be used (refer to Appendix C). Avoid the use of acronyms within
// this field.
// ii. Departments are encouraged to provide a brief description of each contract.
// iii. When a contract involves an economic object code specified in Appendix D, departments are to fulfill
// the reporting requirements specified in Appendix D."
//
// 16		Comments French
// 		ID	comments_fr
// 		Description	"i. Standardized comments are recommended to be used (refer to Appendix C). Avoid the use of acronyms within
// this field.
// ii. Departments are encouraged to provide a brief description of each contract.
// iii. When a contract involves an economic object code specified in Appendix D, departments are to fulfill
// the reporting requirements specified in Appendix D."
//
// 17		Additional Comments English
// 		ID	additional_comments_en
// 		Description	"The additional comments English field may be populated with additional comments when an organization needs
// additional capacity to fulfill the reporting requirements under the comments English data field."
//
// 18		Additional Comments French
// 		ID	additional_comments_fr
// 		Description	"The additional comments French field may be populated with additional comments when an organization needs
// additional capacity to fulfill the reporting requirements under the comments French data field."
//
// 19		Agreement Type
// 		ID	agreement_type_code
// 		Description	"This data field is archived and replaced by the Appendix A data fields for Trade Agreement, Comprehensive
// Land Claims Agreement and Procurement Strategy for Indigenous Business."
// 		Validation	"Mandatory for contracts after 2019-01-01, unless Trade Agreement specified.
//
// This field must be blank if the Trade Agreement field Type is not blank."
// 		Values
// 		0	None
// 		A	ABSA
// 		C	NAFTA / CFTA
// 		D	CETA / TCA / CFTA
// 		E	CETA / TCA / WTO-AGP / CFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CPFTA / CKFTA
// 		F	CETA / TCA / WTO-AGP / NAFTA / CFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CPFTA / CKFTA
// 		I	CFTA
// 		R	LCSA
// 		S	NAFTA / CFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CKFTA
// 		T	NAFTA / CFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CPFTA / CKFTA
// 		V	CFTA / CCFTA / CKFTA
// 		W	WTO-AGP / CFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CPFTA / CKFTA
// 		X	WTO-AGP / CFTA / CCFTA / CKFTA
// 		Y	WTO-AGP / NAFTA / CFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CPFTA / CKFTA
// 		Z	WTO-AGP / NAFTA
// 		AB	CFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CKFTA
// 		AC	CFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CPFTA / CKFTA
// 		AD	CETA / TCA / WTO-AGP / CFTA / CCFTA / CKFTA
// 		AF	CFTA / CHFTA
// 		AG	CETA / TCA / CFTA / CHFTA
// 		AH	CKFTA
// 		AI	CFTA / CKFTA
// 		AJ	CFTA / NAFTA / CKFTA
// 		AK	CPTPP
// 		AN	CFTA / CHFTA / CETA / TCA / CPTPP
// 		AO	CFTA / CCFTA / CKFTA / WTO-AGP / CPTPP
// 		AP	CFTA / NAFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CPFTA / CKFTA / WTO-AGP / CETA / TCA / CPTPP
// 		AQ	CFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CPFTA / CKFTA / WTO-AGP / CETA / TCA / CPTPP
// 		AR	CFTA / NAFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CPFTA / CKFTA / WTO-AGP / CPTPP
// 		AS	CFTA / CCFTA / CCoFTA / CHFTA / CPaFTA / CPFTA / CKFTA / WTO-AGP / CPTPP
// 		AT	CFTA / CCFTA / CKFTA
// 		AU	CFTA / CCFTA / CKFTA / WTO-AGP / CETA / TCA / CPTPP
// 		AV	CFTA / CCFTA
// 		AW	CFTA / CCFTA / CPTPP
// 		AX	CFTA / CKFTA / WTO-AGP / CETA / TCA
// 		AY	CFTA / CKFTA / WTO-AGP / CETA / TCA / CPTPP
// 		AZ	CFTA / CKFTA / WTO-AGP / CPTPP
// 		BA	ABSA / LCSA
// 		N	(discontinued) NAFTA / CCFTA / CCoFTA / CHFTA / CPaFTA
// 		P	(discontinued) NAFTA / CFTA / CCFTA / CCoFTA / CHFTA / CPaFTA
// 		U	(discontinued) CCFTA
// 		AA	(discontinued) CCFTA / CCoFTA / CHFTA / CPaFTA
// 		AE	(discontinued) CHFTA
// 		AL	(discontinued) CFTA / CPTPP
// 		AM	(discontinued) CFTA / CETA / TCA / CPTPP
//
// example:
//   {
//     rowid: 1125013,
//     reference_number: 'C-2022-2023-Q3-00001',
//     procurement_id: '2B0KBQ0249',
//     vendor_name: 'MAPLESOFT CONSULTING INC.',
//     vendor_postal_code: 'K1Z',
//     buyer_name: 'NA',
//     contract_date: '2022-11-02',
//     economic_object_code: '491',
//     description_en: 'Management Consulting',
//     description_fr: 'Services de conseillers en gestion',
//     contract_period_start: '2021-05-10',
//     delivery_date: '2024-05-10',
//     contract_value: 33560000,
//     original_value: 10000000,
//     amendment_value: 10000000,
//     comments_en: 'For a contract with task authorizations, the realized amount of the contract is contingent on the number of task authorizations issued and may be less than the amount proactively disclosed, dependent on the operational requirements of the department.\n' +
//       '\n' +
//       'This contract was competitively sourced. \n' +
//       '\n' +
//       'This contract is a multi-year contract.',
//     comments_fr: 'Pour un marché incluant des autorisations de tâches, le montant réel du marché dépend du nombre d’autorisations de tâches émises, et il peut être inférieur au montant divulgué de façon proactive, selon les exigences opérationnelles du ministère.\n' +
//       '\n' +
//       "Le présent marché a été adjugé dans le cadre d'un concours.\n" +
//       '\n' +
//       "Le présent marché s'échelonne sur plusieurs années.",
//     additional_comments_en: 'Information Technology Consultants',
//     additional_comments_fr: 'Conseillers en Info de la technologie',
//     agreement_type_code: '',
//     trade_agreement: 'XX',
//     land_claims: 'NA',
//     commodity_type: 'S',
//     commodity_code: 'D302A',
//     country_of_vendor: 'CA',
//     solicitation_procedure: 'ST',
//     limited_tendering_reason: '00',
//     trade_agreement_exceptions: '00',
//     indigenous_business: 'NA',
//     indigenous_business_excluding_psib: 'N',
//     intellectual_property: 'C',
//     potential_commercial_exploitation: 'N',
//     former_public_servant: 'N',
//     contracting_entity: 'DC',
//     standing_offer_number: 'EN578-170432/181/EI',
//     instrument_type: 'A',
//     ministers_office: 'N',
//     number_of_bids: 12,
//     article_6_exceptions: '0',
//     award_criteria: '0',
//     socioeconomic_indicator: 'NA',
//     reporting_period: '2022-2023-Q3',
//     owner_org: 'ssc-spc',
//     owner_org_title: 'Shared Services Canada | Services partagés Canada'
//   }
// async function ContractsOver10k({ id }: Props) {
//   const url = `${BASE}/contracts-over-10k/${id}.json?_shape=array`
//   const data = await jsonFetcher(url)
//   console.log(data)
//   if (!data || data.length === 0) return notFound()
//   const contract = data[0]
//
//   return (
//     <DetailsPage
//       fiscal_year={contract.contract_date.slice(0,4)}
//       title={contract.description_en}
//       source_url={contract.source_url}
//       recipient={contract.vendor_name}
//       award_amount={contract.contract_value}
//       program={contract.description_en}
//       type="Contracts Over $10k"
//       summary={contract.comments_en}
//     >
//       <Detail label="Contract Date" value={contract.contract_date} />
//       <Detail label="Delivery Date" value={contract.delivery_date} />
//       <Detail label="Commodity Type" value={contract.commodity_type} />
//       <Detail label="Country of Vendor" value={contract.country_of_vendor} />
//       <Detail label="Standing Offer Number" value={contract.standing_offer_number} />
//     </DetailsPage>
//   )
// }


function Detail({ label, value }: { label: string, value: unknown }) {
  return (
    <div>
      <div className="font-bold text-gray-900">{label}</div>
      <div className="text-gray-700">{String(value || '—')}</div>
    </div>
  )
}

export const AggregatedContractsUnder10k = (props: Props) => <BaseSpendingPage {...props} database="aggregated-contracts-under-10k" label="Contracts Under $10k Summary" />
// export const ContractsOver10k = (props: Props) => <BaseSpendingPage {...props} database="contracts-over-10k" label="Contracts Over $10k" />
export const SSHRCGrants = (props: Props) => <BaseSpendingPage {...props} database="sshrc_grants" label="SSHRC Research Grants" />
export const GlobalAffairsGrants = (props: Props) => <BaseSpendingPage {...props} database="global_affairs_grants" label="Global Affairs Grants" />
export const Transfers = (props: Props) => <BaseSpendingPage {...props} database="transfers" label="Federal Transfers" />
