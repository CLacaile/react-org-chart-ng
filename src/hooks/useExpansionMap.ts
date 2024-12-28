import { useState, useCallback } from "react";

export function useExpansionMap(initialState: Map<number, boolean> = new Map()) {
  const [expansionMap, setExpansionMap] = useState(initialState);

  const toggleNodeExpansion = useCallback((nodeId: number) => {
    setExpansionMap((prev) => {
      const newMap = new Map(prev);
      const isExpanded = newMap.get(nodeId) ?? false;
      newMap.set(nodeId, !isExpanded);
      return newMap;
    });
  }, []);

  return { expansionMap, toggleNodeExpansion };
}