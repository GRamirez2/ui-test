'use client';

import { useWorkDays } from '@/features/work-days/hooks/use-work-days';
import { useViewedMonth } from '@/features/work-days/hooks/use-viewed-month';
import {
  currentYearMonth,
  dateKey,
  monthLayout,
} from '@/features/work-days/work-days-dates';

const monthFormatter = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function WorkCalendar() {
  const { workDays, toggleDay } = useWorkDays();
  const { month, stepMonth } = useViewedMonth();

  // Storage and "today" are only known in the browser.
  if (workDays === null) return <WorkCalendarSkeleton />;

  const today = new Date();
  const view = month ?? currentYearMonth(today);
  const label = monthFormatter.format(new Date(view.year, view.month, 1));
  const { leadingBlanks, daysInMonth } = monthLayout(view);
  const isViewingToday = today.getFullYear() === view.year && today.getMonth() === view.month;

  return (
    <>
      <div className="calendar-nav">
        <button
          type="button"
          className="nav-btn"
          aria-label="Previous month"
          onClick={() => stepMonth(-1)}
        >
          <ChevronIcon d="M15 18l-6-6 6-6" />
        </button>
        <h2 className="month-label" aria-live="polite">
          {label}
        </h2>
        <button
          type="button"
          className="nav-btn"
          aria-label="Next month"
          onClick={() => stepMonth(1)}
        >
          <ChevronIcon d="M9 18l6-6-6-6" />
        </button>
      </div>

      <WeekdayRow />

      <div className="calendar-grid" role="grid" aria-label="Days of the month">
        {Array.from({ length: leadingBlanks }, (_, i) => (
          <div key={`blank-${i}`} className="day-cell" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const key = dateKey(view, day);
          return (
            <div key={key} className="day-cell">
              <DayButton
                day={day}
                label={label}
                pressed={workDays.has(key)}
                isToday={isViewingToday && today.getDate() === day}
                onToggle={() => toggleDay(key)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

function DayButton({
  day,
  label,
  pressed,
  isToday,
  onToggle,
}: {
  day: number;
  label: string;
  pressed: boolean;
  isToday: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={isToday ? 'day-btn is-today' : 'day-btn'}
      aria-pressed={pressed}
      aria-label={`${label} ${day}, ${pressed ? 'marked as worked' : 'not worked'}`}
      onClick={onToggle}
    >
      <span>{day}</span>
      <svg
        className="check-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </button>
  );
}

function ChevronIcon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}

function WeekdayRow() {
  return (
    <div className="weekday-row" aria-hidden="true">
      {WEEKDAYS.map((name) => (
        <span key={name}>{name}</span>
      ))}
    </div>
  );
}

/** Five rows of cells: the common month height. Six-row months grow by one row. */
export function WorkCalendarSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="calendar-nav">
        <span className="nav-btn-placeholder" />
        <span className="month-label-skeleton" />
        <span className="nav-btn-placeholder" />
      </div>
      <WeekdayRow />
      <div className="calendar-grid">
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className="day-cell">
            <span className="day-skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}
