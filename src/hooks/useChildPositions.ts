import { useMemo } from "react";
import { PersonData } from "../types/person";
import { getSubtreeWidth } from "../utils/treeUtils";
import { PERSON_WIDTH, TREE_SIBLING_SPACING, PERSON_HEIGHT, TREE_LEVEL_SPACING } from "../utils/constants";

/**
 * Calculer les positions des enfants d'un nœud.
 */
export function useChildPositions(
  parent: PersonData,
  parentX: number,
  parentY: number,
  parentSubtreeWidth: number,
  personExpansionMap: Map<number, boolean>
) {
  const isLeaf = parent.children.length === 0;
  const isExpanded = personExpansionMap.get(parent.id) || false;

  return useMemo(() => {
    
    if (!isExpanded || isLeaf) {
      return [];
    }

    let childXStart = parentX - parentSubtreeWidth / 2;

    return parent.children.map((child) => {
      const childSubtreeWidth = getSubtreeWidth(child, PERSON_WIDTH, personExpansionMap, TREE_SIBLING_SPACING);
      const childX = childXStart + childSubtreeWidth / 2;
      const childY = parentY + PERSON_HEIGHT + TREE_LEVEL_SPACING;

      childXStart += childSubtreeWidth + TREE_SIBLING_SPACING;

      return { child, x: childX, y: childY };
    });
  }, [parent, parentX, parentY, parentSubtreeWidth, personExpansionMap, isExpanded, isLeaf]);
}
