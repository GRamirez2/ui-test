import { useSearchParams } from 'next/navigation';
import {
  currentYearMonth,
  parseMonthKey,
  shiftMonth,
  toMonthKey,
} from '@/features/work-days/work-days-dates';

/**
 * The month being viewed lives in the URL (`?month=2026-11`) so it is shareable
 * and survives reloads. `month` is `null` when the param is absent or invalid;
 * callers fall back to the current month on the client.
 */
export function useViewedMonth() {
  const searchParams = useSearchParams();
  const month = parseMonthKey(searchParams.get('month'));

  /**
   * Steps from the URL as it is *now*, not from the last render, so rapid
   * clicks that land before React re-renders still advance one month each.
   */
  function stepMonth(delta: number) {
    const params = new URLSearchParams(window.location.search);
    const from = parseMonthKey(params.get('month')) ?? currentYearMonth();
    params.set('month', toMonthKey(shiftMonth(from, delta)));
    // Native History API integrates with the Next.js router (no server round trip).
    window.history.replaceState(null, '', `?${params.toString()}`);
  }

  return { month, stepMonth };
}
