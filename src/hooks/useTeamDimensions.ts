import { useMemo } from "react";
import { PersonData } from "../types/person";
import { getTreeDimensions } from "../utils/treeUtils";
import { PERSON_WIDTH, PERSON_HEIGHT, TREE_LEVEL_SPACING, TREE_SIBLING_SPACING } from "../utils/constants";

export const useTeamDimensions = (
  teamRootNode: PersonData,
  teamExpansionMap: Map<number, boolean>
) => {
  return useMemo(() => {
    return getTreeDimensions(teamRootNode, PERSON_WIDTH, PERSON_HEIGHT, teamExpansionMap, TREE_LEVEL_SPACING, TREE_SIBLING_SPACING);
  }, [teamRootNode, teamExpansionMap]);
};