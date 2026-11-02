import { useState, useEffect } from 'react';
import { SEARCH_DEBOUNCE_DELAY_MS } from '../domain/constants';

/**
 * Custom hook to debounce any rapidly changing value (e.g. search input).
 * Prevents unnecessary re-computations and UI jank during fast typing.
 */
export function useDebouncedValue<T>(
  value: T,
  delayMs: number = SEARCH_DEBOUNCE_DELAY_MS
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delayMs]);

  return debouncedValue;
}

