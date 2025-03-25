import { Contributors } from "@/app/(main)/about/contributors";
import FAQ from "@/app/(main)/about/faq";
import { H1, H2, Intro, Page, PageContent, Section } from "@/components/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Making Government Spending Clear | About Us | Canada Spends',
  description: 'We don’t tell you what to think—we give you the facts. Meet the team making government spending data accessible to all Canadians.',
}


export default function About() {
  return (
    <Page>

      <PageContent>
        <Section>
          <H1>Canada, you need the facts.</H1>
          <Intro>
            Every year, hundreds of billions of dollars move through the Government of Canada’s budget. This data is technically available but the information is difficult to understand and spread across PDFs and databases that most Canadians don’t know about.
          </Intro>
          <Intro>
            It doesn’t have to be this way.
          </Intro>
          <Intro>
            Canada Spends is a platform to make government spending more transparent. We take raw data and transform it into easy to understand facts for Canadians. We don’t tell you what to think. We don’t weigh in on whether spending is good or bad. We give you the facts so you can decide for yourself.
          </Intro>
          <Intro>
            — Canada Spends Team
          </Intro>
        </Section>

        <Section>
          <H2>Contributors / Supporters</H2>

          <Contributors />
        </Section>

        <Section>
          <H2>Frequently Asked Questions</H2>
          <FAQ />
        </Section>

      </PageContent >



    </Page >
  );
}
