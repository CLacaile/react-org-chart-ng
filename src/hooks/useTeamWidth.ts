import { useMemo } from "react";
import { PersonData } from "../types/person";
import { getSubtreeWidth } from "../utils/treeUtils";
import { PERSON_WIDTH, TEAM_SIBLING_SPACING } from "../utils/constants";

export const useTeamWidth = (
  person: PersonData,
  personExpansionMap: Map<number, boolean>
) => {
  return useMemo(() => {
    return getSubtreeWidth(person, PERSON_WIDTH, personExpansionMap, TEAM_SIBLING_SPACING);
  }, [person, personExpansionMap]);
};