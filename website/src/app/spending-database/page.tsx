import { ExternalLink, H1, Intro, Page, PageContent, Section } from "@/components/Layout";
import { Metadata } from "next";
import Search from "@/components/Search";
export const metadata: Metadata = {
  title: 'Spending Database | Canada Spends',
  description: 'A searchable database of federal spending data, consolidated from multiple open data sources.',
}


export default function Contact() {
  return (
    <Page>
      <PageContent>
        <Section>
          <H1>Federal Spending Database</H1>
          <Search />
        </Section>
      </PageContent>
    </Page>
  )
}