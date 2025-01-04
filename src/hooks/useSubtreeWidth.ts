import { useMemo } from "react";
import { NodeData } from "../types/node";
import { getSubtreeWidth } from "../utils/treeUtils";
import { NODE_WIDTH, TREE_SIBLING_SPACING } from "../utils/constants";

export const useSubtreeWidth = (
  node: NodeData,
  nodesExpansionMap: Map<number, boolean>
) => {
  return useMemo(() => {
    return getSubtreeWidth(node, NODE_WIDTH, nodesExpansionMap, TREE_SIBLING_SPACING);
  }, [node, nodesExpansionMap]);
};