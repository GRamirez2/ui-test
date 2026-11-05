import { DiceDemo } from '@/features/marketing/components/dice-demo';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-inner">
        <p className="eyebrow">For game nights, team socials &amp; parties</p>
        <h1>Let the dice run the party.</h1>
        <p className="hero-subtitle">
          Disco Dice turns any hangout into a game. Roll live with everyone in the room (or across the world), draw a
          prompt, and let chance pick what happens next.
        </p>
        <DiceDemo>
          <a className="btn btn-primary btn-lg" href="#pricing">
            Start rolling — it&apos;s free
          </a>
        </DiceDemo>
      </div>
    </section>
  );
}
