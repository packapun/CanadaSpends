import {
  getDepartmentData,
  getDepartmentsForJurisdiction,
  getExpandedDepartments,
  getJurisdictionData,
  getJurisdictionSlugs,
} from "@/lib/jurisdictions";

export const dynamicParams = false;

export async function generateStaticParams() {
  const jurisdictions = getJurisdictionSlugs();

  const all = jurisdictions.flatMap((jurisdiction) => {
    const departments = getDepartmentsForJurisdiction(jurisdiction);
    return departments.map((department) => ({ jurisdiction, department }));
  });
  return all;
}

import {
  ChartContainer,
  H1,
  H2,
  H3,
  Intro,
  P,
  Page,
  PageContent,
  Section,
} from "@/components/Layout";
import { StatCard, StatCardContainer } from "@/components/StatCard";
import { initLingui } from "@/initLingui";
import { Trans } from "@lingui/react/macro";
import { DepartmentMiniSankey } from "@/components/Sankey/DepartmentMiniSankey";
import { JurisdictionDepartmentList } from "@/components/DepartmentList";

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ lang: string; jurisdiction: string; department: string }>;
}) {
  const {
    lang,
    jurisdiction: jurisdictionSlug,
    department: departmentSlug,
  } = await params;

  initLingui(lang);

  const { jurisdiction } = getJurisdictionData(jurisdictionSlug);
  const departments = getExpandedDepartments(jurisdiction.slug);

  const department = getDepartmentData(jurisdictionSlug, departmentSlug);

  return (
    <Page>
      <PageContent>
        <Section>
          <H1>
            <Trans>{department.name}</Trans>
          </H1>
          <Intro>
            <Trans>
              The {department.name} manages critical provincial operations and
              services for Ontario residents.
            </Trans>
          </Intro>

          <StatCardContainer>
            <StatCard
              title={
                <Trans>In Financial Year {jurisdiction.financialYear},</Trans>
              }
              value={department.totalSpendingFormatted}
              subtitle={<Trans>was spent by {department.name}</Trans>}
            />
            <StatCard
              title={
                <Trans>In Financial Year {jurisdiction.financialYear},</Trans>
              }
              value={department.percentageFormatted}
              subtitle={
                <Trans>
                  of {jurisdiction.name} provincial spending was by{" "}
                  {department.name}
                </Trans>
              }
            />
          </StatCardContainer>

          <P>
            <Trans>
              The {jurisdiction.name} {department.name} spent{" "}
              {department.totalSpendingFormatted} in fiscal year (FY){" "}
              {jurisdiction.financialYear}, representing{" "}
              {department.percentageFormatted} of the{" "}
              {jurisdiction.totalProvincialSpendingFormatted} in total
              provincial spending.
            </Trans>
          </P>

          <H2>
            <Trans>
              {department.name} accounted for {department.percentageFormatted}{" "}
              of all {jurisdiction.name}
              provincial spending in FY {jurisdiction.financialYear}
            </Trans>
          </H2>

          <P>
            <Trans>
              This ministry plays an important role in {jurisdiction.name}'s
              government operations, delivering essential services and programs
              to residents across the province.
            </Trans>
          </P>

          <ChartContainer>
            <DepartmentMiniSankey department={department} />
          </ChartContainer>

          <Section>
            <H3>
              <Trans>Major Programs and Services</Trans>
            </H3>
            <P>
              <Trans>
                The {department.name} operates various programs and services as
                part of {jurisdiction.name}'s commitment to delivering effective
                government services to residents.
              </Trans>
            </P>
          </Section>

          <Section>
            <H2>
              <Trans>Other {jurisdiction.name} Government Ministries</Trans>
            </H2>
            <JurisdictionDepartmentList
              jurisdiction={jurisdiction}
              lang={lang}
              departments={departments}
              current={department.slug}
            />
          </Section>
        </Section>
      </PageContent>
    </Page>
  );
}

// 			total: ministryData.totalSpending,
// 	spending: ministryData.totalSpending,
// 	revenue: 0,
// 	spending_data: {
// 		name: t`Ontario Cabinet Office → Cabinet Office`,
// 		amount: ministryData.totalSpending,
// 		children: [...ministryData.spending_data.children]
// 	},
// 	revenue_data: {
// 		name: t`Revenue`,
// 		amount: 0,
// 		children: []
// 	}
// };
