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
import { EducationMiniSankey } from "./EducationMiniSankey";

export async function generateMetadata(
	props: PropsWithChildren<PageLangParam>,
) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();
	return {
		title: t`Ontario Education | Canada Spends`,
		description: t`A look at how Ontario's Education ministry spends its budget`,
	};
}

export default async function EducationMinistry(props: PageLangParam) {
	const lang = (await props.params).lang;
	initLingui(lang);

	const { t } = useLingui();

	return (
		<Page>
			<PageContent>
				<Section>
					<H1><Trans>Ontario Education</Trans></H1>
					<Intro>
						<Trans>
							The Ontario Ministry of Education is responsible for publicly funded elementary and secondary education, 
							child care and early years programs. The ministry funds 72 district school boards that operate approximately 
							4,900 schools serving about 2 million students. With a budget of over $35 billion, Education represents the 
							second largest ministry in Ontario's government.
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
							value="$39.7B"
							subtitle={t`was spent by Ontario Education`}
						/>
						<StatCard
							title={t`In FY 2024,`}
							value="19.8%"
							subtitle={t`of Ontario provincial spending was by Education`}
						/>
					</StatCardContainer>
				</Section>

				<Section>
					<P>
						<Trans>
							The Ontario Ministry of Education spent $39.7 billion in fiscal year (FY) 2024, 
							representing 19.8% of the $200.6 billion in total provincial spending. 
							The ministry's expenditures primarily support school board operations, teacher salaries, 
							child care and early years programming, and school capital projects.
						</Trans>
					</P>

					<H2><Trans>Education accounted for 19.8% of all Ontario provincial spending in FY 2024</Trans></H2>

					<P>
						<Trans>
							Education spending includes funding for school boards, teacher pensions, education property taxes, 
							and child care expansion. The ministry's budget supports nearly 2 million students across 
							elementary and secondary schools, plus early childhood education and care programs.
						</Trans>
					</P>

					<P>
						<Trans>
							Major initiatives include the $10-a-day child care program, school capital infrastructure projects, 
							special education supports, and technology integration in classrooms. The ministry also oversees 
							curriculum development and educational quality assurance.
						</Trans>
					</P>
				</Section>

				<Section>
					<H2>
						<Trans>
							How did Ontario Education spend its budget in 2024?
						</Trans>
					</H2>
					<P>
						<Trans>
							Education spending is divided across school board operating grants, child care and early years programs, 
							capital projects, teacher pensions, and education property tax expenses. 
							The largest expenditures in FY 2024 included school board operating funding and child care expansion.
						</Trans>
					</P>

					<H3><Trans>Ontario Education spending breakdown for FY 2024</Trans></H3>

					<ChartContainer>
						<NoSSR>
							<EducationMiniSankey />
						</NoSSR>
					</ChartContainer>
				</Section>

				<Section>
					<H2>
						<Trans>Who leads Ontario Education?</Trans>
					</H2>
					<P>
						<Trans>
							The Ontario Ministry of Education is overseen by the{" "}
							<ExternalLink href="https://www.ontario.ca/page/executive-council#education">
								Minister of Education
							</ExternalLink>
							, who is responsible for setting education policy and ensuring 
							quality education delivery across Ontario's public school system.
						</Trans>
					</P>
					<P>
						<Trans>
							The Minister serves as part of the{" "}
							<ExternalLink href="https://www.ontario.ca/page/executive-council">
								Ontario Cabinet
							</ExternalLink>{" "}
							and is appointed by the Premier. The ministry works closely with 
							school boards and education stakeholders to support student achievement.
						</Trans>
					</P>
				</Section>

				<Section>
					<H2>
						<Trans>Explore other Ontario Ministries</Trans>
					</H2>
					<OntarioMinistryList current="education" />
				</Section>
			</PageContent>
		</Page>
	);
} 