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
import { HealthMiniSankey } from "./HealthMiniSankey";

export async function generateMetadata(
	props: PropsWithChildren<PageLangParam>,
) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();
	return {
		title: t`Ontario Health | Canada Spends`,
		description: t`A look at how Ontario's Health ministry spends its budget`,
	};
}

export default async function HealthMinistry(props: PageLangParam) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();

	return (
		<Page>
			<PageContent>
				<Section>
					<H1><Trans>Ontario Health</Trans></H1>
					<Intro>
						<Trans>
							The Ontario Ministry of Health is responsible for setting policy direction for the provincial health care system, 
							funding hospitals and health care providers, and ensuring Ontarians have access to quality health care services. 
							The ministry oversees Ontario Health (formerly Ontario Health) which coordinates the delivery of health services 
							across the province. With a budget of over $37 billion, Health represents the largest ministry in Ontario's government.
						</Trans>
					</Intro>
				</Section>

				<Section>
					<div className="text-sm text-gray-500 italic">
						<Trans>Data updated from Ontario Public Accounts 2023-24</Trans>
					</div>
					<StatCardContainer>
						<StatCard
							title={t`In FY 2024,`}
							value="$73.4B"
							subtitle={t`was spent by Ontario Health`}
						/>
						<StatCard
							title={t`In FY 2024,`}
							value="36.6%"
							subtitle={t`of Ontario provincial spending was by Health`}
						/>
					</StatCardContainer>
				</Section>

				<Section>
					<P>
						<Trans>
							The Ontario Ministry of Health spent $73.4 billion in fiscal year (FY) 2024, 
							representing 36.6% of the $200.6 billion in total provincial spending. 
							The ministry's expenditures primarily support hospital operations, physician services, 
							home care, mental health programs, and digital health initiatives.
						</Trans>
					</P>

					<H2><Trans>Health accounted for 36.6% of all Ontario provincial spending in FY 2024</Trans></H2>

					<P>
						<Trans>
							Health spending has grown significantly over time due to an aging population, 
							increased demand for services, and investments in hospital infrastructure. 
							The ministry's budget supports over 140 hospitals, thousands of physicians, 
							and numerous community health programs across Ontario.
						</Trans>
					</P>

					<P>
						<Trans>
							Major initiatives include hospital capacity expansion, mental health and addictions 
							programs, digital health transformation, and primary care reforms. The ministry also 
							oversees the Ontario Health Insurance Program (OHIP) and coordinates pandemic response efforts.
						</Trans>
					</P>
				</Section>

				<Section>
					<H2>
						<Trans>
							How did Ontario Health spend its budget in 2024?
						</Trans>
					</H2>
					<P>
						<Trans>
							Health spending is divided across hospital operations, physician services, 
							home care, mental health programs, capital projects, and administration. 
							The largest expenditures in FY 2024 included hospital funding, 
							payments to physicians and practitioners, and home care services.
						</Trans>
					</P>

					<H3><Trans>Ontario Health spending breakdown for FY 2024</Trans></H3>

					<ChartContainer>
						<NoSSR>
							<HealthMiniSankey />
						</NoSSR>
					</ChartContainer>
				</Section>

				<Section>
					<H2>
						<Trans>Who leads Ontario Health?</Trans>
					</H2>
					<P>
						<Trans>
							The Ontario Ministry of Health is overseen by the{" "}
							<ExternalLink href="https://www.ontario.ca/page/executive-council#health">
								Minister of Health
							</ExternalLink>
							, who is responsible for setting health policy direction and ensuring 
							quality health care delivery across the province.
						</Trans>
					</P>
					<P>
						<Trans>
							The Minister serves as part of the{" "}
							<ExternalLink href="https://www.ontario.ca/page/executive-council">
								Ontario Cabinet
							</ExternalLink>{" "}
							and is appointed by the Premier. The ministry also works closely with 
							Ontario Health and local health integration networks to coordinate 
							service delivery.
						</Trans>
					</P>
				</Section>

				<Section>
					<H2>
						<Trans>Explore other Ontario Ministries</Trans>
					</H2>
					<OntarioMinistryList current="health" />
				</Section>
			</PageContent>
		</Page>
	);
} 