// Disco Dice wordmark. Logo colors are brand assets and intentionally not themed.
// Used by both the (client) header and the (server) footer, so it has no directive.

export function BrandLink({ gradientId, className = 'brand' }: { gradientId: string; className?: string }) {
  return (
    <a className={className} href="#top">
      <svg className="brand-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="5" fill={`url(#${gradientId})`} />
        <circle cx="8" cy="8" r="1.6" fill="#1A0B2E" />
        <circle cx="16" cy="8" r="1.6" fill="#1A0B2E" />
        <circle cx="12" cy="12" r="1.6" fill="#1A0B2E" />
        <circle cx="8" cy="16" r="1.6" fill="#1A0B2E" />
        <circle cx="16" cy="16" r="1.6" fill="#1A0B2E" />
        <defs>
          <linearGradient id={gradientId} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2E92" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>
      <span>Disco Dice</span>
    </a>
  );
}
