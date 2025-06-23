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
import { LongTermCareMiniSankey } from "./LongTermCareMiniSankey";

export async function generateMetadata(
	props: PropsWithChildren<PageLangParam>,
) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();
	return {
		title: t`Ontario Long-Term Care | CanadaSpends`,
		description: t`Explore Ontario's Long-Term Care spending: $7.9B in fiscal year 2024, covering long-term care homes and operations.`,
	};
}

export default async function LongTermCarePage(
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
						<Trans>Ontario Long-Term Care</Trans>
					</H1>
					<Intro>
						<Trans>
							The Long-Term Care ministry manages critical provincial operations and services for Ontario residents.
						</Trans>
					</Intro>

					<StatCardContainer>
						<StatCard
							title={t`In FY 2024,`}
							value="$7.9B"
							subtitle={t`was spent by Long-Term Care`}
						/>
						<StatCard
							title={t`In FY 2024,`}
							value="3.9%"
							subtitle={t`of Ontario provincial spending was by Long-Term Care`}
						/>
					</StatCardContainer>

					<P>
						<Trans>
							The Ontario Long-Term Care spent $7.9B in fiscal year (FY) 2024, 
							representing 3.9% of the $200.6 billion in total provincial spending.
						</Trans>
					</P>

					<H2><Trans>Long-Term Care accounted for 3.9% of all Ontario provincial spending in FY 2024</Trans></H2>

					<P>
						<Trans>
							This ministry plays an important role in Ontario's government operations, 
							delivering essential services and programs to residents across the province.
						</Trans>
					</P>

					<ChartContainer>
						<NoSSR>
							<LongTermCareMiniSankey />
						</NoSSR>
					</ChartContainer>

					<Section>
						<H3><Trans>Major Programs and Services</Trans></H3>
						<P>
							<Trans>
								The Long-Term Care operates various programs and services as part of Ontario's commitment 
								to delivering effective government services to residents.
							</Trans>
						</P>
					</Section>

					<Section>
						<H2><Trans>Other Ontario Government Ministries</Trans></H2>
						<OntarioMinistryList current="long-term-care" />
					</Section>
				</Section>
			</PageContent>
		</Page>
	);
}