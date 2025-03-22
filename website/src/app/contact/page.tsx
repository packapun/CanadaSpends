import { ExternalLink, H1, Intro, Page, PageContent, Section } from "@/components/Layout";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Connect with Us | Canada Spends',
  description: 'Have questions or feedback? Email us at hi@canadaspends.com or connect with us on X @canada_spends - we’d love to hear from you!',
}


export default function Contact() {
  return (
    <Page>
      <PageContent>
        <Section>
          <H1>Connect with us</H1>
          <Intro>
            We love to hear from the community.
          </Intro>
          <Intro>
            Email us at <ExternalLink href="mailto:hi@canadaspends.com">hi@canadaspends.com</ExternalLink> or connect with us on X <ExternalLink href="https://x.com/canada_spends">@canada_spends</ExternalLink> and we'll get back to you as soon as we can.
          </Intro>
        </Section>
      </PageContent>
    </Page>
  )
}