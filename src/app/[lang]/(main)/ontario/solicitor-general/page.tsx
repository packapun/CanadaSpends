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
import { SolicitorGeneralMiniSankey } from "./SolicitorGeneralMiniSankey";

export async function generateMetadata(
	props: PropsWithChildren<PageLangParam>,
) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();
	return {
		title: t`Ontario Solicitor General | CanadaSpends`,
		description: t`Explore Ontario's Solicitor General spending: $4.2B in fiscal year 2024, covering policing, corrections, and public safety.`,
	};
}

export default async function SolicitorGeneralPage(
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
						<Trans>Ontario Solicitor General</Trans>
					</H1>
					<Intro>
						<Trans>
							The Solicitor General ministry manages critical provincial operations and services for Ontario residents.
						</Trans>
					</Intro>

					<StatCardContainer>
						<StatCard
							title={t`In FY 2024,`}
							value="$4.2B"
							subtitle={t`was spent by Solicitor General`}
						/>
						<StatCard
							title={t`In FY 2024,`}
							value="2.1%"
							subtitle={t`of Ontario provincial spending was by Solicitor General`}
						/>
					</StatCardContainer>

					<P>
						<Trans>
							The Ontario Solicitor General spent $4.2B in fiscal year (FY) 2024, 
							representing 2.1% of the $200.6 billion in total provincial spending.
						</Trans>
					</P>

					<H2><Trans>Solicitor General accounted for 2.1% of all Ontario provincial spending in FY 2024</Trans></H2>

					<P>
						<Trans>
							This ministry plays an important role in Ontario's government operations, 
							delivering essential services and programs to residents across the province.
						</Trans>
					</P>

					<ChartContainer>
						<NoSSR>
							<SolicitorGeneralMiniSankey />
						</NoSSR>
					</ChartContainer>

					<Section>
						<H3><Trans>Major Programs and Services</Trans></H3>
						<P>
							<Trans>
								The Solicitor General operates various programs and services as part of Ontario's commitment 
								to delivering effective government services to residents.
							</Trans>
						</P>
					</Section>

					<Section>
						<H2><Trans>Other Ontario Government Ministries</Trans></H2>
						<OntarioMinistryList current="solicitor-general" />
					</Section>
				</Section>
			</PageContent>
		</Page>
	);
}