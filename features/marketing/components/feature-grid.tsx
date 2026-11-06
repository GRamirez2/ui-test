import type { ReactNode } from 'react';

const FEATURES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: 'Disco rooms',
    body: 'Spin up a room, share a code, and roll together in real time — everyone sees the same result land.',
    icon: (
      <>
        <path d="M17 2l1.6 3.4L22 7l-3.4 1.6L17 12l-1.6-3.4L12 7l3.4-1.6L17 2z" />
        <path d="M6 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
        <circle cx="6" cy="6" r="2.5" />
      </>
    ),
  },
  {
    title: 'Prompt packs',
    body: 'Icebreakers, trivia, dares, team-social packs — swap the deck to match the crowd in one tap.',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 2v4M16 2v4" />
      </>
    ),
  },
  {
    title: 'Custom dice skins',
    body: 'Brand the dice for your team social or themed party — colors, pips, and faces, all customizable.',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    title: 'Instant sync',
    body: 'Phones, laptops, the TV in the living room — every screen in the room stays in lockstep.',
    icon: (
      <path d="M12 2v6M12 16v6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2" />
    ),
  },
];

export function FeatureSection() {
  return (
    <section className="section" id="features">
      <div className="section-inner">
        <p className="eyebrow eyebrow-center">Features</p>
        <h2 className="section-title">Everything a host needs, built in</h2>
        <p className="section-subtitle">No extra apps, no awkward silence. Disco Dice keeps the room moving.</p>

        <div className="feature-grid">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="feature-card">
              <span className="feature-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  focusable="false"
                >
                  {feature.icon}
                </svg>
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
