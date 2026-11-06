import { useCallback, useMemo, useSyncExternalStore } from 'react';
import {
  getWorkDaysServerSnapshot,
  getWorkDaysSnapshot,
  parseWorkDays,
  subscribeWorkDays,
  writeWorkDays,
} from '@/features/work-days/work-days-storage';

/**
 * Worked days from browser storage. `workDays` is `null` during server render and
 * hydration — callers render their skeleton until the client snapshot is available.
 */
export function useWorkDays() {
  const raw = useSyncExternalStore(subscribeWorkDays, getWorkDaysSnapshot, getWorkDaysServerSnapshot);
  const workDays = useMemo(() => (raw === null ? null : parseWorkDays(raw)), [raw]);

  const toggleDay = useCallback((key: string) => {
    const next = parseWorkDays(getWorkDaysSnapshot());
    if (next.has(key)) next.delete(key);
    else next.add(key);
    writeWorkDays(next);
  }, []);

  return { workDays, toggleDay };
}
