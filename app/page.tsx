import type { Metadata } from 'next';
import { FaqSection } from '@/features/marketing/components/faq';
import { FeatureSection } from '@/features/marketing/components/feature-grid';
import { Hero } from '@/features/marketing/components/hero';
import { PricingSection } from '@/features/marketing/components/pricing';
import { CtaBand, SiteFooter } from '@/features/marketing/components/site-footer';
import { SiteHeader } from '@/features/marketing/components/site-header';
import '@/features/marketing/marketing.css';

export const metadata: Metadata = {
  title: 'Disco Dice — Let the dice run the party',
  description:
    'Disco Dice turns any group hangout into a game. Roll live with friends, draw prompt packs, and let the dice pick what happens next.',
};

// Fully static: no data reads, so no Suspense boundaries are needed.
export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <FeatureSection />
        <PricingSection />
        <FaqSection />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
