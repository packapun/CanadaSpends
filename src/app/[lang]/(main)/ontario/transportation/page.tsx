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
import { TransportationMiniSankey } from "./TransportationMiniSankey";

export async function generateMetadata(
	props: PropsWithChildren<PageLangParam>,
) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();
	return {
		title: t`Ontario Transportation | CanadaSpends`,
		description: t`Explore Ontario's Transportation spending: $12.1B in fiscal year 2024, covering transit, highways, and transportation infrastructure.`,
	};
}

export default async function TransportationPage(
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
						<Trans>Ontario Transportation</Trans>
					</H1>
					<Intro>
						<Trans>
							The Transportation ministry manages critical provincial operations and services for Ontario residents.
						</Trans>
					</Intro>

					<StatCardContainer>
						<StatCard
							title={t`In FY 2024,`}
							value="$12.1B"
							subtitle={t`was spent by Transportation`}
						/>
						<StatCard
							title={t`In FY 2024,`}
							value="6.0%"
							subtitle={t`of Ontario provincial spending was by Transportation`}
						/>
					</StatCardContainer>

					<P>
						<Trans>
							The Ontario Transportation spent $12.1B in fiscal year (FY) 2024, 
							representing 6.0% of the $200.6 billion in total provincial spending.
						</Trans>
					</P>

					<H2><Trans>Transportation accounted for 6.0% of all Ontario provincial spending in FY 2024</Trans></H2>

					<P>
						<Trans>
							This ministry plays an important role in Ontario's government operations, 
							delivering essential services and programs to residents across the province.
						</Trans>
					</P>

					<ChartContainer>
						<NoSSR>
							<TransportationMiniSankey />
						</NoSSR>
					</ChartContainer>

					<Section>
						<H3><Trans>Major Programs and Services</Trans></H3>
						<P>
							<Trans>
								The Transportation operates various programs and services as part of Ontario's commitment 
								to delivering effective government services to residents.
							</Trans>
						</P>
					</Section>

					<Section>
						<H2><Trans>Other Ontario Government Ministries</Trans></H2>
						<OntarioMinistryList current="transportation" />
					</Section>
				</Section>
			</PageContent>
		</Page>
	);
}