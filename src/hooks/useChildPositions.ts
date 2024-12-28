import { useMemo } from "react";
import { NodeData } from "../components/Node";
import * as CONSTANTS from "../utils/constants";
import { getSubtreeWidth } from "../utils/treeUtils";

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
      const childSubtreeWidth = getSubtreeWidth(child, CONSTANTS.nodeWidth, nodesExpansionMap, CONSTANTS.treeSiblingSpacing);
      const childX = childXStart + childSubtreeWidth / 2;
      const childY = parentY + CONSTANTS.nodeHeight + CONSTANTS.treeLevelSpacing;

      childXStart += childSubtreeWidth + CONSTANTS.treeSiblingSpacing;

      return { child, x: childX, y: childY };
    });
  }, [parent, parentX, parentY, parentSubtreeWidth, nodesExpansionMap, isExpanded, isLeaf]);
}
