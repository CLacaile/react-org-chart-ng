import { useState, useCallback } from "react";

export function usePersonExpansionMap(initialState: Map<number, boolean> = new Map()) {
  const [personExpansionMap, setPersonExpansionMap] = useState(initialState);

  const togglePersonExpansion = useCallback((personId: number) => {
    setPersonExpansionMap((prev) => {
      const newMap = new Map(prev);
      const isExpanded = newMap.get(personId) ?? false;
      newMap.set(personId, !isExpanded);
      return newMap;
    });
  }, []);

  return { personExpansionMap, togglePersonExpansion };
}