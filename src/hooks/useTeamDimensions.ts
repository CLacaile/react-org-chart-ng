import { useMemo } from "react";
import { PersonData } from "../types/person";
import { getTeamDimensions } from "../utils/teamUtils";
import { PERSON_WIDTH, PERSON_HEIGHT, TEAM_LEVEL_SPACING, TEAM_SIBLING_SPACING } from "../utils/constants";

export const useTeamDimensions = (
  teamRootNode: PersonData,
  teamExpansionMap: Map<number, boolean>
) => {
  return useMemo(() => {
    return getTeamDimensions(teamRootNode, PERSON_WIDTH, PERSON_HEIGHT, teamExpansionMap, TEAM_LEVEL_SPACING, TEAM_SIBLING_SPACING);
  }, [teamRootNode, teamExpansionMap]);
};