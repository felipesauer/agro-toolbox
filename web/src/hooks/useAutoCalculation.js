import { useEffect, useRef } from 'react';
import { useCalculation } from './useCalculation';
import { useDebounce } from './useDebounce';

/**
 * Wraps useCalculation with debounced auto-trigger.
 * Pass the current inputs object — when it changes (debounced),
 * calculate() fires automatically if all required fields are filled.
 *
 * @param {string} endpoint - API endpoint
 * @param {object} inputs - current form fields
 * @param {object} [opts]
 * @param {number} [opts.delay=500] - debounce delay in ms
 * @param {function} [opts.isReady] - predicate: (inputs) => boolean — controls when to auto-fire
 */
export function useAutoCalculation(endpoint, inputs, { delay = 500, isReady } = {}) {
  const calc = useCalculation(endpoint);
  const debounced = useDebounce(inputs, delay);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const ready = isReady ? isReady(debounced) : Object.values(debounced).every((v) => v !== '' && v != null);
    if (ready) {
      calc.calculate(debounced);
    }
  }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  return calc;
}
