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
import { ChildrenCommunityAndSocialServicesMiniSankey } from "./ChildrenCommunityAndSocialServicesMiniSankey";

export async function generateMetadata(
	props: PropsWithChildren<PageLangParam>,
) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();
	return {
		title: t`Ontario Children, Community and Social Services | CanadaSpends`,
		description: t`Explore Ontario's Children, Community and Social Services spending: $19.6B in fiscal year 2024, covering ODSP, Ontario Works, and child protection.`,
	};
}

export default async function ChildrenCommunityandSocialServicesPage(
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
						<Trans>Ontario Children, Community and Social Services</Trans>
					</H1>
					<Intro>
						<Trans>
							The Children, Community and Social Services ministry manages critical provincial operations and services for Ontario residents.
						</Trans>
					</Intro>

					<StatCardContainer>
						<StatCard
							title={t`In FY 2024,`}
							value="$19.6B"
							subtitle={t`was spent by Children, Community and Social Services`}
						/>
						<StatCard
							title={t`In FY 2024,`}
							value="9.8%"
							subtitle={t`of Ontario provincial spending was by Children, Community and Social Services`}
						/>
					</StatCardContainer>

					<P>
						<Trans>
							The Ontario Children, Community and Social Services spent $19.6B in fiscal year (FY) 2024, 
							representing 9.8% of the $200.6 billion in total provincial spending.
						</Trans>
					</P>

					<H2><Trans>Children, Community and Social Services accounted for 9.8% of all Ontario provincial spending in FY 2024</Trans></H2>

					<P>
						<Trans>
							This ministry plays an important role in Ontario's government operations, 
							delivering essential services and programs to residents across the province.
						</Trans>
					</P>

					<ChartContainer>
						<NoSSR>
							<ChildrenCommunityAndSocialServicesMiniSankey />
						</NoSSR>
					</ChartContainer>

					<Section>
						<H3><Trans>Major Programs and Services</Trans></H3>
						<P>
							<Trans>
								The Children, Community and Social Services operates various programs and services as part of Ontario's commitment 
								to delivering effective government services to residents.
							</Trans>
						</P>
					</Section>

					<Section>
						<H2><Trans>Other Ontario Government Ministries</Trans></H2>
						<OntarioMinistryList current="children-community-and-social-services" />
					</Section>
				</Section>
			</PageContent>
		</Page>
	);
}