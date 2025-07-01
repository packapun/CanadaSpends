import {
	ChartContainer,
	ExternalLink,
	H1,
	H2,
	H3,
	Intro,
	P,
	Page,
	PageContent,
	Section,
} from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import { OntarioMinistryList } from "@/components/OntarioMinistryList";
import { StatCard, StatCardContainer } from "@/components/StatCard";
import { initLingui, type PageLangParam } from "@/initLingui";
import { Trans, useLingui } from "@lingui/react/macro";
import type { PropsWithChildren } from "react";
import { AttorneyGeneralMiniSankey } from "./AttorneyGeneralMiniSankey";

export async function generateMetadata(
	props: PropsWithChildren<PageLangParam>,
) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();
	return {
		title: t`Ontario Attorney General | CanadaSpends`,
		description: t`Explore Ontario's Attorney General spending: $2.2B in fiscal year 2024, covering courts, legal services, and justice programs.`,
	};
}

export default async function AttorneyGeneralPage(
	props: PageLangParam,
) {
	const params = await props.params;
	initLingui(params.lang);
	const { t } = useLingui();

	return (
		<Page>
			<PageContent>
				<Section>
					<H1>
						<Trans>Ontario Attorney General</Trans>
					</H1>
					<Intro>
						<Trans>
							The Attorney General ministry manages critical provincial operations and services for Ontario residents.
						</Trans>
					</Intro>

					<StatCardContainer>
						<StatCard
							title={t`In FY 2024,`}
							value="$2.2B"
							subtitle={t`was spent by Attorney General`}
						/>
						<StatCard
							title={t`In FY 2024,`}
							value="1.1%"
							subtitle={t`of Ontario provincial spending was by Attorney General`}
						/>
					</StatCardContainer>

					<P>
						<Trans>
							The Ontario Attorney General spent $2.2B in fiscal year (FY) 2024, 
							representing 1.1% of the $200.6 billion in total provincial spending.
						</Trans>
					</P>

					<H2><Trans>Attorney General accounted for 1.1% of all Ontario provincial spending in FY 2024</Trans></H2>

					<P>
						<Trans>
							This ministry plays an important role in Ontario's government operations, 
							delivering essential services and programs to residents across the province.
						</Trans>
					</P>

					<ChartContainer>
						<NoSSR>
							<AttorneyGeneralMiniSankey />
						</NoSSR>
					</ChartContainer>

					<Section>
						<H3><Trans>Major Programs and Services</Trans></H3>
						<P>
							<Trans>
								The Attorney General operates various programs and services as part of Ontario's commitment 
								to delivering effective government services to residents.
							</Trans>
						</P>
					</Section>

					<Section>
						<H2><Trans>Other Ontario Government Ministries</Trans></H2>
						<OntarioMinistryList current="attorney-general" />
					</Section>
				</Section>
			</PageContent>
		</Page>
	);
}