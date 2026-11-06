import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { WorkCalendar, WorkCalendarSkeleton } from '@/features/work-days/components/work-calendar';
import { WorkSummary, WorkSummarySkeleton } from '@/features/work-days/components/work-summary';
import '@/features/work-days/work-days.css';

export const metadata: Metadata = {
  title: 'Work Days',
  description: 'Tap a day you worked. It’s saved automatically.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f7' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

// Header and card chrome are in the static shell. The card bodies read the
// `?month=` param and browser storage, so they render behind boundaries.
export default function WorkDaysPage() {
  return (
    <div className="work-days-screen">
      <main className="page">
        <header className="page-header">
          <h1>Work Days</h1>
          <p className="page-subtitle">Tap a day you worked. It&apos;s saved automatically.</p>
        </header>

        <section className="calendar-card" aria-label="Work calendar">
          <Suspense fallback={<WorkCalendarSkeleton />}>
            <WorkCalendar />
          </Suspense>
        </section>

        <section className="summary-card" aria-label="Month summary">
          <Suspense fallback={<WorkSummarySkeleton />}>
            <WorkSummary />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
