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
import { TourismCultureAndSportMiniSankey } from "./TourismCultureAndSportMiniSankey";

export async function generateMetadata(
	props: PropsWithChildren<PageLangParam>,
) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();
	return {
		title: t`Ontario Tourism, Culture, and Sport | CanadaSpends`,
		description: t`Explore Ontario's Tourism, Culture, and Sport spending: $1.5B in fiscal year 2024, covering ministry operations and programs.`,
	};
}

export default async function TourismCultureandSportPage(
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
						<Trans>Ontario Tourism, Culture, and Sport</Trans>
					</H1>
					<Intro>
						<Trans>
							The Tourism, Culture, and Sport ministry manages critical provincial operations and services for Ontario residents.
						</Trans>
					</Intro>

					<StatCardContainer>
						<StatCard
							title={t`In FY 2024,`}
							value="$1.5B"
							subtitle={t`was spent by Tourism, Culture, and Sport`}
						/>
						<StatCard
							title={t`In FY 2024,`}
							value="0.7%"
							subtitle={t`of Ontario provincial spending was by Tourism, Culture, and Sport`}
						/>
					</StatCardContainer>

					<P>
						<Trans>
							The Ontario Tourism, Culture, and Sport spent $1.5B in fiscal year (FY) 2024, 
							representing 0.7% of the $200.6 billion in total provincial spending.
						</Trans>
					</P>

					<H2><Trans>Tourism, Culture, and Sport accounted for 0.7% of all Ontario provincial spending in FY 2024</Trans></H2>

					<P>
						<Trans>
							This ministry plays an important role in Ontario's government operations, 
							delivering essential services and programs to residents across the province.
						</Trans>
					</P>

					<ChartContainer>
						<NoSSR>
							<TourismCultureAndSportMiniSankey />
						</NoSSR>
					</ChartContainer>

					<Section>
						<H3><Trans>Major Programs and Services</Trans></H3>
						<P>
							<Trans>
								The Tourism, Culture, and Sport operates various programs and services as part of Ontario's commitment 
								to delivering effective government services to residents.
							</Trans>
						</P>
					</Section>

					<Section>
						<H2><Trans>Other Ontario Government Ministries</Trans></H2>
						<OntarioMinistryList current="tourism-culture-and-sport" />
					</Section>
				</Section>
			</PageContent>
		</Page>
	);
}