import { useMemo } from "react";
import { NodeData } from "../types/node";
import { getSubtreeWidth } from "../utils/treeUtils";
import { NODE_WIDTH, TREE_SIBLING_SPACING, NODE_HEIGHT, TREE_LEVEL_SPACING } from "../utils/constants";

/**
 * Calculer les positions des enfants d'un nœud.
 */
export function useChildPositions(
  parent: NodeData,
  parentX: number,
  parentY: number,
  parentSubtreeWidth: number,
  nodesExpansionMap: Map<number, boolean>
) {
  const isLeaf = parent.children.length === 0;
  const isExpanded = nodesExpansionMap.get(parent.id) || false;

  return useMemo(() => {
    
    if (!isExpanded || isLeaf) {
      return [];
    }

    let childXStart = parentX - parentSubtreeWidth / 2;

    return parent.children.map((child) => {
      const childSubtreeWidth = getSubtreeWidth(child, NODE_WIDTH, nodesExpansionMap, TREE_SIBLING_SPACING);
      const childX = childXStart + childSubtreeWidth / 2;
      const childY = parentY + NODE_HEIGHT + TREE_LEVEL_SPACING;

      childXStart += childSubtreeWidth + TREE_SIBLING_SPACING;

      return { child, x: childX, y: childY };
    });
  }, [parent, parentX, parentY, parentSubtreeWidth, nodesExpansionMap, isExpanded, isLeaf]);
}
