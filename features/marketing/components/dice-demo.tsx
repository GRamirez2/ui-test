'use client';

import { useState, type ReactNode } from 'react';

type Face = 1 | 2 | 3 | 4 | 5 | 6;

const PIP_LAYOUTS: Record<Face, string[]> = {
  1: ['pip-center'],
  2: ['pip-tl', 'pip-br'],
  3: ['pip-tl', 'pip-center', 'pip-br'],
  4: ['pip-tl', 'pip-tr', 'pip-bl', 'pip-br'],
  5: ['pip-tl', 'pip-tr', 'pip-center', 'pip-bl', 'pip-br'],
  6: ['pip-tl', 'pip-tr', 'pip-ml', 'pip-mr', 'pip-bl', 'pip-br'],
};

const ROLL_MS = 500; // matches the die-roll keyframes in marketing.css

/**
 * Hero action row + demo die. `children` is the primary CTA, rendered by the
 * server hero and placed next to the client-owned "Try a roll" button.
 */
export function DiceDemo({ children }: { children: ReactNode }) {
  const [face, setFace] = useState<Face>(1);
  const [rolled, setRolled] = useState(false);
  const [rolling, setRolling] = useState(false);

  function roll() {
    if (rolling) return;
    const result = (Math.floor(Math.random() * 6) + 1) as Face;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFace(result);
      setRolled(true);
      return;
    }

    setRolling(true);
    window.setTimeout(() => {
      setFace(result);
      setRolled(true);
      setRolling(false);
    }, ROLL_MS);
  }

  const hint = rolling ? 'Rolling...' : rolled ? `Rolled a ${face}` : 'Tap "Try a roll" to see it in action';

  return (
    <>
      <div className="hero-actions">
        {children}
        <button type="button" className="btn btn-outline btn-lg" onClick={roll}>
          Try a roll
        </button>
      </div>

      <div className="dice-demo" aria-live="polite">
        <div className={rolling ? 'die is-rolling' : 'die'} role="img" aria-label={`Demo die showing ${face}`}>
          {PIP_LAYOUTS[face].map((position) => (
            <span key={position} className={`pip ${position}`} />
          ))}
        </div>
        <p className="dice-demo-hint">{hint}</p>
      </div>
    </>
  );
}
