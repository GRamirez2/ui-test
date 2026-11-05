import { FaqItem } from '@/features/marketing/components/faq-item';

const FAQS = [
  {
    question: 'Do all players need the app?',
    answer: 'No install required. Share the room link or code and anyone can join from a browser on any device.',
  },
  {
    question: 'Can I bring my own prompts?',
    answer: 'Yes — Party and Crew plans let you build custom prompt packs alongside the built-in ones.',
  },
  {
    question: "What happens when I hit my plan's player limit?",
    answer:
      'New joiners wait in a lobby until a spot opens, or you can upgrade the room on the spot — no roll gets interrupted.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, every plan is month-to-month. Cancel from your account settings, no calls required.',
  },
];

export function FaqSection() {
  return (
    <section className="section" id="faq">
      <div className="section-inner section-inner-narrow">
        <p className="eyebrow eyebrow-center">FAQ</p>
        <h2 className="section-title">Questions, answered</h2>

        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.question} id={`faq-${i + 1}`} question={faq.question}>
              <p>{faq.answer}</p>
            </FaqItem>
          ))}
        </div>
      </div>
    </section>
  );
}
