// Pure calendar helpers for the work-days feature. No React, no browser APIs.

export type YearMonth = { year: number; month: number }; // month is 0-based

const MONTH_PARAM = /^(\d{4})-(0[1-9]|1[0-2])$/;

/** `2026-11` style key used in storage prefixes and the `?month=` param. */
export function toMonthKey({ year, month }: YearMonth): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

export function parseMonthKey(value: string | null): YearMonth | null {
  const match = value ? MONTH_PARAM.exec(value) : null;
  return match ? { year: Number(match[1]), month: Number(match[2]) - 1 } : null;
}

export function currentYearMonth(now = new Date()): YearMonth {
  return { year: now.getFullYear(), month: now.getMonth() };
}

export function shiftMonth({ year, month }: YearMonth, delta: number): YearMonth {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

/** `2026-11-05` style key stored per worked day. */
export function dateKey({ year, month }: YearMonth, day: number): string {
  return `${toMonthKey({ year, month })}-${String(day).padStart(2, '0')}`;
}

export function monthLayout({ year, month }: YearMonth) {
  return {
    leadingBlanks: new Date(year, month, 1).getDay(),
    daysInMonth: new Date(year, month + 1, 0).getDate(),
  };
}

export function countDaysInMonth(workDays: ReadonlySet<string>, ym: YearMonth): number {
  const prefix = `${toMonthKey(ym)}-`;
  let count = 0;
  workDays.forEach((key) => {
    if (key.startsWith(prefix)) count++;
  });
  return count;
}
