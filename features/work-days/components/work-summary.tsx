'use client';

import { useWorkDays } from '@/features/work-days/hooks/use-work-days';
import { useViewedMonth } from '@/features/work-days/hooks/use-viewed-month';
import { countDaysInMonth, currentYearMonth } from '@/features/work-days/work-days-dates';

export function WorkSummary() {
  const { workDays } = useWorkDays();
  const { month } = useViewedMonth();

  if (workDays === null) return <WorkSummarySkeleton />;

  const count = countDaysInMonth(workDays, month ?? currentYearMonth());

  return (
    <>
      <span className="summary-count">{count}</span>
      <span className="summary-text">days worked this month</span>
    </>
  );
}

export function WorkSummarySkeleton() {
  return (
    <>
      <span className="summary-count summary-count-skeleton" aria-hidden="true" />
      <span className="summary-text">days worked this month</span>
    </>
  );
}
