"use client";

import { createContext, useContext } from "react";

const CalculatorSlugContext = createContext<string | undefined>(undefined);

export function CalculatorSlugProvider({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <CalculatorSlugContext.Provider value={slug}>
      {children}
    </CalculatorSlugContext.Provider>
  );
}

export function useCalculatorSlug() {
  return useContext(CalculatorSlugContext);
}
