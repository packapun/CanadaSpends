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
import { CollegesAndUniversitiesMiniSankey } from "./CollegesAndUniversitiesMiniSankey";

export async function generateMetadata(
	props: PropsWithChildren<PageLangParam>,
) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();
	return {
		title: t`Ontario Colleges and Universities | CanadaSpends`,
		description: t`Explore Ontario's Colleges and Universities spending: $7.1B in fiscal year 2024, covering post-secondary education and research.`,
	};
}

export default async function CollegesandUniversitiesPage(
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
						<Trans>Ontario Colleges and Universities</Trans>
					</H1>
					<Intro>
						<Trans>
							The Colleges and Universities ministry manages critical provincial operations and services for Ontario residents.
						</Trans>
					</Intro>

					<StatCardContainer>
						<StatCard
							title={t`In FY 2024,`}
							value="$7.1B"
							subtitle={t`was spent by Colleges and Universities`}
						/>
						<StatCard
							title={t`In FY 2024,`}
							value="3.5%"
							subtitle={t`of Ontario provincial spending was by Colleges and Universities`}
						/>
					</StatCardContainer>

					<P>
						<Trans>
							The Ontario Colleges and Universities spent $7.1B in fiscal year (FY) 2024, 
							representing 3.5% of the $200.6 billion in total provincial spending.
						</Trans>
					</P>

					<H2><Trans>Colleges and Universities accounted for 3.5% of all Ontario provincial spending in FY 2024</Trans></H2>

					<P>
						<Trans>
							This ministry plays an important role in Ontario's government operations, 
							delivering essential services and programs to residents across the province.
						</Trans>
					</P>

					<ChartContainer>
						<NoSSR>
							<CollegesAndUniversitiesMiniSankey />
						</NoSSR>
					</ChartContainer>

					<Section>
						<H3><Trans>Major Programs and Services</Trans></H3>
						<P>
							<Trans>
								The Colleges and Universities operates various programs and services as part of Ontario's commitment 
								to delivering effective government services to residents.
							</Trans>
						</P>
					</Section>

					<Section>
						<H2><Trans>Other Ontario Government Ministries</Trans></H2>
						<OntarioMinistryList current="colleges-and-universities" />
					</Section>
				</Section>
			</PageContent>
		</Page>
	);
}