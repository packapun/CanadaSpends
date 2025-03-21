import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/Accordion";
import { ExternalLink, P } from "@/components/Layout";

const faqs = [
  {
    question: 'Why did you start this project?',
    answer: 'We were frustrated by the lack of clear, accessible, unbiased data on government spending. We wanted to create a platform that focused on giving Canadians data-driven facts about how their money is being spent without spin.'
  },
  {
    question: 'What are the core ideas?',
    answer: `We believe that Canadians need access to easy to understand information about government spending. We don't pass judgement on public spending decisions. We don't tell you what to think. Our only agenda is to ensure that all Canadians get the facts on spending in a clear and simple format.`,
  },
  {
    question: 'Where do you get the data on your website?',
    answer: 'All of the information we use comes from publicly available databases and reports issued by the Government of Canada. We reference sources for all of our content.'
  },
  {
    question: 'Is this a lobby group?',
    answer: 'No, we are not a lobby group. We are not paid, nor do we represent any special interest groups. Our mission is purely to share data-driven insights on federal government spending.'
  },
  {
    question: 'Is this a permanent organization?',
    answer: 'No, we currently envision this as a short-term project. Our focus is to bring data-driven spending insights to Canadians.'
  },
  {
    question: 'What is your affiliation with Build Canada?',
    answer: `We are a project of Build Canada. While some team members overlap, involvement in Build Canada doesn't imply involvement in Canada Spends and vice versa. `
  },
  {
    question: 'How can I show my support?',
    answer: `The best way to support us is to engage with our content. Like, share, and comment on our posts on social media. Even better, share our work with a friend and encourage them to do the same. Together, we can expand the conversation and reach more people with these important facts.`
  },
  {
    question: 'Can I donate?',
    answer: `At this time, the best way to support us is through engagement and amplification of our content. If we open up to donations in the future, we’ll let you know how you can contribute directly to our efforts.`
  },
  {
    question: 'How can I stay up to date on your work?',
    answer: `Stay connected by signing up for our newsletter. It’s the best way to get updates, exclusive insights, and learn about new initiatives as they happen.`
  },
  {
    question: 'Can I get involved?',
    answer: <P>
      We welcome passionate individuals who want to help make a difference. Whether it’s by contributing your skills, helping with outreach, or amplifying our work, we’d love to hear from you. Reach out to us at <ExternalLink href="mailto:hi@canadaspends.com">hi@canadaspends.com</ExternalLink>.
    </P>
  },
  {
    question: 'Are you DOGE?',
    answer: <>
      <P>No, we’re not copying the DOGE playbook from the US.</P>
      <P>We care about Canada winning. We care about Canada being a self-sustaining, independent and resilient country. </P>
      <P>Our government is going to have to make hard choices about our nation’s spending to ensure we can invest in creating a competitive, resilient, and independent nation. We care about giving Canadians the facts about spending so they can engage in this conversation with elected officials.</P>
    </>
  }
]


export default function FAQ() {
  return (
    <Accordion type="single" className="w-full">
      {faqs.map(faq => (
        <AccordionItem key={faq.question} value={faq.question}>
          <AccordionTrigger><strong>{faq.question}</strong></AccordionTrigger>
          <AccordionContent>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}

    </Accordion>
  );
}
