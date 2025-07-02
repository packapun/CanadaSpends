import { JurisdictionDepartmentList } from "@/components/DepartmentList";
import {
  ExternalLink,
  H1,
  H2,
  InternalLink,
  Intro,
  P,
  Page,
  PageContent,
  Section,
} from "@/components/Layout";
import { JurisdictionSankey } from "@/components/Sankey/JurisdictionSankey";
import { initLingui } from "@/initLingui";
import {
  getExpandedDepartments,
  getJurisdictionData,
  getJurisdictionSlugs,
} from "@/lib/jurisdictions";
import { Trans } from "@lingui/react/macro";

export function generateStaticParams() {
  const slugs = getJurisdictionSlugs();

  const jurs = slugs.map((slug) => ({ jurisdiction: slug }));

  console.log({ jurs });

  return jurs;
}

export default async function ProvinceIndex({
  params,
}: {
  params: Promise<{ jurisdiction: string; lang: string }>;
}) {
  const { jurisdiction: slug, lang } = await params;
  initLingui(lang);

  const { jurisdiction, sankey } = getJurisdictionData(slug);

  const departments = getExpandedDepartments(jurisdiction.slug);

  return (
    <Page>
      <PageContent>
        <Section>
          <H1>
            <Trans>{jurisdiction.name} Government Spending</Trans>
          </H1>
          <Intro>
            <Trans>
              Get data-driven insights into how {jurisdiction.name}'s provincial
              revenue and spending affect {jurisdiction.name} residents and
              programs.
            </Trans>
          </Intro>
        </Section>
        <Section>
          <H2>
            <Trans>
              Financial Year {jurisdiction.financialYear} {jurisdiction.name}{" "}
              Government Revenue and Spending
            </Trans>
          </H2>
          <P>
            <Trans>
              Explore {jurisdiction.name}'s revenue and spending categories or
              filter by ministry for deeper insights.
            </Trans>
          </P>
        </Section>
      </PageContent>
      <div className="sankey-chart-container relative overflow-hidden sm:(mr-0 ml-0) md:(min-h-[776px] min-w-[1280px] w-screen -ml-[50vw] -mr-[50vw] left-1/2 right-1/2)">
        <JurisdictionSankey data={sankey} />
        <div className="absolute bottom-3 left-6">
          <ExternalLink
            className="text-xs text-gray-400"
            href={jurisdiction.source}
          >
            <Trans>Source</Trans>
          </ExternalLink>
        </div>
        <div className="absolute top-0 left-0 w-[100vw] h-full  backdrop-blur-sm z-10 text-white md:hidden flex items-center justify-center">
          <ExternalLink
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href={`/${jurisdiction.slug}/spending-full-screen`}
          >
            <Trans>View this chart in full screen</Trans>
          </ExternalLink>
        </div>
      </div>
      <Section>
        <H2>
          <Trans>{jurisdiction.name} Government Departments explained</Trans>
        </H2>
        <JurisdictionDepartmentList
          jurisdiction={jurisdiction}
          lang={lang}
          departments={departments}
        />
      </Section>
      <Section>
        <H2>
          <Trans>Sources</Trans>
        </H2>
        <P>
          <Trans>
            All government spending data is sourced from official databases, but
            due to the complexity of these systems, occasional errors may occur
            despite our best efforts. We aim to make this information more
            accessible and accurate, and we welcome feedback. If you notice any
            issues, please let us know{" "}
            <InternalLink href="/contact">here</InternalLink> — we appreciate it
            and will work to address them promptly.
          </Trans>
        </P>
      </Section>
    </Page>
  );
}
