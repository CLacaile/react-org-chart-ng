import { useMemo } from "react";
import { PersonData } from "../types/person";
import { getTeamWidth } from "../utils/teamUtils";
import { PERSON_WIDTH, TEAM_SIBLING_SPACING, PERSON_HEIGHT, TEAM_LEVEL_SPACING } from "../utils/constants";

/**
 * Calculer les positions des enfants d'un nœud.
 */
export function useTeamMembersPositions(
  rootNode: PersonData,
  rootNodeX: number,
  rootNodeY: number,
  parentSubtreeWidth: number,
  personExpansionMap: Map<number, boolean>
) {
  const isLeaf = rootNode.children.length === 0;
  const isExpanded = personExpansionMap.get(rootNode.id) || false;

  return useMemo(() => {
    
    if (!isExpanded || isLeaf) {
      return [];
    }

    let childXStart = rootNodeX - parentSubtreeWidth / 2;

    return rootNode.children.map((child) => {
      const childSubtreeWidth = getTeamWidth(child, PERSON_WIDTH, personExpansionMap, TEAM_SIBLING_SPACING);
      const childX = childXStart + childSubtreeWidth / 2;
      const childY = rootNodeY + PERSON_HEIGHT + TEAM_LEVEL_SPACING;

      childXStart += childSubtreeWidth + TEAM_SIBLING_SPACING;

      return { child, x: childX, y: childY };
    });
  }, [rootNode, rootNodeX, rootNodeY, parentSubtreeWidth, personExpansionMap, isExpanded, isLeaf]);
}
