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
  parentSubtreeWidth: number
) {
  return useMemo(() => {
    const isLeaf = parent.children.length === 0;
    if (isLeaf) {
      return [];
    }

    let childXStart = parentX - parentSubtreeWidth / 2;

    return parent.children.map((child) => {
      const childSubtreeWidth = getSubtreeWidth(child, CONSTANTS.nodeWidth, CONSTANTS.treeSiblingSpacing);
      const childX = childXStart + childSubtreeWidth / 2;
      const childY = parentY + CONSTANTS.nodeHeight + CONSTANTS.treeLevelSpacing;

      childXStart += childSubtreeWidth + CONSTANTS.treeSiblingSpacing;

      return { child, x: childX, y: childY };
    });
  }, [parent, parentX, parentY, parentSubtreeWidth]);
}
