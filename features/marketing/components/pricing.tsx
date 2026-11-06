type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    name: 'Solo',
    price: '$0',
    description: 'For casual rolls with a few friends.',
    features: ['Up to 4 players per room', '3 starter prompt packs', 'Standard dice skins'],
    cta: 'Start free',
  },
  {
    name: 'Party',
    price: '$9',
    description: 'For hosts who run game night every week.',
    features: [
      'Up to 20 players per room',
      'All prompt packs, updated monthly',
      'Custom dice skins',
      'Room recordings & highlights',
    ],
    cta: 'Start 14-day trial',
    popular: true,
  },
  {
    name: 'Crew',
    price: '$29',
    description: 'For teams running socials across offices.',
    features: ['Unlimited players', 'Team workspaces & scheduling', 'Brand-matched dice & prompts', 'Priority support'],
    cta: 'Talk to us',
  },
];

export function PricingSection() {
  return (
    <section className="section section-pricing" id="pricing">
      <div className="section-inner">
        <p className="eyebrow eyebrow-center">Pricing</p>
        <h2 className="section-title">Pick your table stakes</h2>
        <p className="section-subtitle">Start free. Upgrade when the group gets bigger than the living room.</p>

        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <PriceCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceCard({ plan }: { plan: Plan }) {
  return (
    <article className={plan.popular ? 'price-card price-card-popular' : 'price-card'}>
      {plan.popular ? <p className="price-badge">Most popular</p> : null}
      <h3>{plan.name}</h3>
      <p className="price">
        <span className="price-amount">{plan.price}</span>
        <span className="price-period">/month</span>
      </p>
      <p className="price-desc">{plan.description}</p>
      <ul className="price-features">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <a className={plan.popular ? 'btn btn-primary btn-block' : 'btn btn-outline btn-block'} href="#top">
        {plan.cta}
      </a>
    </article>
  );
}
