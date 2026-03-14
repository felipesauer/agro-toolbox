"use client";

import { useEffect, useRef, useCallback } from "react";
import { useCalculation } from "./useCalculation";

/**
 * Hook que auto-calcula em debounce quando os inputs mudam.
 */
export function useAutoCalculation<T, R>(
  calcFn: (inputs: T) => R,
  inputs: T,
  options?: {
    debounce?: number;
    isReady?: (inputs: T) => boolean;
    toolSlug?: string;
  }
) {
  const { debounce = 400, isReady, toolSlug } = options ?? {};
  const { data, loading, error, calculate, reset } = useCalculation(calcFn, { toolSlug });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  const trigger = useCallback(() => {
    if (isReady && !isReady(inputs)) return;
    calculate(inputs);
  }, [inputs, isReady, calculate]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(trigger, debounce);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [trigger, debounce]);

  return { data, result: data, loading, error, calculate, reset };
}
