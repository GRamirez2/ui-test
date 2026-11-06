// Browser-local persistence for worked days, shaped as an external store for
// `useSyncExternalStore`. Same storage key and JSON-array format as before the
// Next.js migration, so existing saved days carry over.

const STORAGE_KEY = 'workDays';
const EMPTY = '[]';

let cache: string | undefined;
const listeners = new Set<() => void>();

function read(): string {
  if (cache === undefined) {
    try {
      cache = localStorage.getItem(STORAGE_KEY) ?? EMPTY;
    } catch {
      cache = EMPTY; // storage unavailable; state stays in memory for this session
    }
  }
  return cache;
}

function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return;
  cache = event.newValue ?? EMPTY;
  listeners.forEach((listener) => listener());
}

export function subscribeWorkDays(listener: () => void) {
  if (listeners.size === 0) window.addEventListener('storage', onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener('storage', onStorage);
  };
}

export function getWorkDaysSnapshot(): string {
  return read();
}

/** No storage on the server: render the skeleton until the client snapshot is read. */
export function getWorkDaysServerSnapshot(): null {
  return null;
}

export function parseWorkDays(raw: string): Set<string> {
  try {
    const parsed: unknown = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []);
  } catch {
    return new Set();
  }
}

export function writeWorkDays(days: Iterable<string>) {
  cache = JSON.stringify([...days]);
  try {
    localStorage.setItem(STORAGE_KEY, cache);
  } catch {
    // storage unavailable; the in-memory cache still drives the UI
  }
  listeners.forEach((listener) => listener());
}
