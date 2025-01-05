import { useState, useCallback } from "react";

export function useTeamMembersExpansionMap(initialState: Map<number, boolean> = new Map()) {
  const [teamMembersExpansionMap, setPersonExpansionMap] = useState(initialState);

  const toggleTeamMemberExpansion = useCallback((personId: number) => {
    setPersonExpansionMap((prev) => {
      const newMap = new Map(prev);
      const isExpanded = newMap.get(personId) ?? false;
      newMap.set(personId, !isExpanded);
      return newMap;
    });
  }, []);

  return { teamMembersExpansionMap, toggleTeamMemberExpansion };
}