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
import { OmbudsmanOntarioOmbudsmanOntarioMiniSankey } from "./OmbudsmanOntarioOmbudsmanOntarioMiniSankey";

export async function generateMetadata(
	props: PropsWithChildren<PageLangParam>,
) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();
	return {
		title: t`Ontario Ombudsman Ontario → Ombudsman Ontario | CanadaSpends`,
		description: t`Explore Ontario's Ombudsman Ontario → Ombudsman Ontario spending: $0.0B in fiscal year 2024, covering ministry operations and programs.`,
	};
}

export default async function OmbudsmanOntarioOmbudsmanOntarioPage(
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
						<Trans>Ontario Ombudsman Ontario → Ombudsman Ontario</Trans>
					</H1>
					<Intro>
						<Trans>
							The Ombudsman Ontario → Ombudsman Ontario ministry manages critical provincial operations and services for Ontario residents.
						</Trans>
					</Intro>

					<StatCardContainer>
						<StatCard
							title={t`In FY 2024,`}
							value="$0.0B"
							subtitle={t`was spent by Ombudsman Ontario → Ombudsman Ontario`}
						/>
						<StatCard
							title={t`In FY 2024,`}
							value="0.0%"
							subtitle={t`of Ontario provincial spending was by Ombudsman Ontario → Ombudsman Ontario`}
						/>
					</StatCardContainer>

					<P>
						<Trans>
							The Ontario Ombudsman Ontario → Ombudsman Ontario spent $0.0B in fiscal year (FY) 2024, 
							representing 0.0% of the $200.6 billion in total provincial spending.
						</Trans>
					</P>

					<H2><Trans>Ombudsman Ontario → Ombudsman Ontario accounted for 0.0% of all Ontario provincial spending in FY 2024</Trans></H2>

					<P>
						<Trans>
							This ministry plays an important role in Ontario's government operations, 
							delivering essential services and programs to residents across the province.
						</Trans>
					</P>

					<ChartContainer>
						<NoSSR>
							<OmbudsmanOntarioOmbudsmanOntarioMiniSankey />
						</NoSSR>
					</ChartContainer>

					<Section>
						<H3><Trans>Major Programs and Services</Trans></H3>
						<P>
							<Trans>
								The Ombudsman Ontario → Ombudsman Ontario operates various programs and services as part of Ontario's commitment 
								to delivering effective government services to residents.
							</Trans>
						</P>
					</Section>

					<Section>
						<H2><Trans>Other Ontario Government Ministries</Trans></H2>
						<OntarioMinistryList current="ombudsman-ontario-ombudsman-ontario" />
					</Section>
				</Section>
			</PageContent>
		</Page>
	);
}