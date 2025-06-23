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
import { NorthernDevelopmentMiniSankey } from "./NorthernDevelopmentMiniSankey";

export async function generateMetadata(
	props: PropsWithChildren<PageLangParam>,
) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();
	return {
		title: t`Ontario Northern Development | CanadaSpends`,
		description: t`Explore Ontario's Northern Development spending: $0.7B in fiscal year 2024, covering ministry operations and programs.`,
	};
}

export default async function NorthernDevelopmentPage(
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
						<Trans>Ontario Northern Development</Trans>
					</H1>
					<Intro>
						<Trans>
							The Northern Development ministry manages critical provincial operations and services for Ontario residents.
						</Trans>
					</Intro>

					<StatCardContainer>
						<StatCard
							title={t`In FY 2024,`}
							value="$0.7B"
							subtitle={t`was spent by Northern Development`}
						/>
						<StatCard
							title={t`In FY 2024,`}
							value="0.3%"
							subtitle={t`of Ontario provincial spending was by Northern Development`}
						/>
					</StatCardContainer>

					<P>
						<Trans>
							The Ontario Northern Development spent $0.7B in fiscal year (FY) 2024, 
							representing 0.3% of the $200.6 billion in total provincial spending.
						</Trans>
					</P>

					<H2><Trans>Northern Development accounted for 0.3% of all Ontario provincial spending in FY 2024</Trans></H2>

					<P>
						<Trans>
							This ministry plays an important role in Ontario's government operations, 
							delivering essential services and programs to residents across the province.
						</Trans>
					</P>

					<ChartContainer>
						<NoSSR>
							<NorthernDevelopmentMiniSankey />
						</NoSSR>
					</ChartContainer>

					<Section>
						<H3><Trans>Major Programs and Services</Trans></H3>
						<P>
							<Trans>
								The Northern Development operates various programs and services as part of Ontario's commitment 
								to delivering effective government services to residents.
							</Trans>
						</P>
					</Section>

					<Section>
						<H2><Trans>Other Ontario Government Ministries</Trans></H2>
						<OntarioMinistryList current="northern-development" />
					</Section>
				</Section>
			</PageContent>
		</Page>
	);
}