import { useMemo } from "react";
import { PersonData } from "../types/person";
import { getTreeDimensions } from "../utils/treeUtils";
import { PERSON_WIDTH, PERSON_HEIGHT, TREE_LEVEL_SPACING, TREE_SIBLING_SPACING } from "../utils/constants";

export const useTreeDimensions = (
  person: PersonData,
  PersonExpansionMap: Map<number, boolean>
) => {
  return useMemo(() => {
    return getTreeDimensions(person, PERSON_WIDTH, PERSON_HEIGHT, PersonExpansionMap, TREE_LEVEL_SPACING, TREE_SIBLING_SPACING);
  }, [person, PersonExpansionMap]);
};