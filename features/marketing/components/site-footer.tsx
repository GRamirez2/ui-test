import { BrandLink } from '@/features/marketing/components/brand-link';

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="section-inner cta-band-inner">
        <h2>Ready to let the dice decide?</h2>
        <p>Set up your first room in under a minute. No credit card needed.</p>
        <a className="btn btn-primary btn-lg" href="#pricing">
          Start rolling — it&apos;s free
        </a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="section-inner footer-inner">
        <BrandLink gradientId="diceGradFooter" className="brand brand-footer" />
        <p className="footer-copy">© 2026 Disco Dice. All rights reserved.</p>
      </div>
    </footer>
  );
}
