import { useMemo } from "react";
import { PersonData } from "../types/person";
import { getTeamWidth } from "../utils/teamUtils";
import { PERSON_WIDTH, TEAM_SIBLING_SPACING } from "../utils/constants";

export const useTeamWidth = (
  person: PersonData,
  personExpansionMap: Map<number, boolean>
) => {
  return useMemo(() => {
    return getTeamWidth(person, PERSON_WIDTH, personExpansionMap, TEAM_SIBLING_SPACING);
  }, [person, personExpansionMap]);
};