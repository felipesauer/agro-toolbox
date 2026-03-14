"use client";

import { useCallback, useReducer } from "react";

interface CalculationState<T, R> {
  data: R | null;
  loading: boolean;
  error: string | null;
  inputs: T | null;
}

type Action<R> =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: R }
  | { type: "ERROR"; payload: string }
  | { type: "RESET" };

function reducer<T, R>(
  state: CalculationState<T, R>,
  action: Action<R>
): CalculationState<T, R> {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { loading: false, error: null, data: action.payload, inputs: state.inputs };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "RESET":
      return { data: null, loading: false, error: null, inputs: null };
    default:
      return state;
  }
}

/**
 * Hook para calculadoras client-side (sem API).
 * Recebe uma função de cálculo pura e gerencia o estado.
 */
export function useCalculation<T, R>(
  calcFn: (inputs: T) => R,
  options?: {
    toolSlug?: string;
    onSuccess?: (result: R, inputs: T) => void;
  }
) {
  const [state, dispatch] = useReducer(reducer<T, R>, {
    data: null,
    loading: false,
    error: null,
    inputs: null,
  });

  const calculate = useCallback(
    (inputs: T) => {
      dispatch({ type: "LOADING" });
      try {
        const result = calcFn(inputs);
        dispatch({ type: "SUCCESS", payload: result });
        options?.onSuccess?.(result, inputs);

        // Save to history
        if (options?.toolSlug) {
          try {
            const key = `agrotoolbox:history:${options.toolSlug}`;
            const existing = JSON.parse(localStorage.getItem(key) ?? "[]");
            const entry = {
              id: Date.now(),
              timestamp: new Date().toISOString(),
              inputs,
              result,
            };
            const updated = [entry, ...existing].slice(0, 20);
            localStorage.setItem(key, JSON.stringify(updated));
          } catch {
            // silent
          }
        }
      } catch (err) {
        dispatch({
          type: "ERROR",
          payload: err instanceof Error ? err.message : "Erro no cálculo",
        });
      }
    },
    [calcFn, options]
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return { ...state, calculate, reset };
}
