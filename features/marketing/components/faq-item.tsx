'use client';

import { useState, type ReactNode } from 'react';

/** Accordion row. The answer is server-rendered content passed as `children`. */
export function FaqItem({ id, question, children }: { id: string; question: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <h3>
        <button
          type="button"
          className="faq-trigger"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((value) => !value)}
        >
          {question}
          <svg
            className="faq-chevron"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </h3>
      <div className={open ? 'faq-panel is-open' : 'faq-panel'} id={id} role="region">
        {children}
      </div>
    </div>
  );
}
