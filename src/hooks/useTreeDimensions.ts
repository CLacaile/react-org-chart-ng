import { useMemo } from "react";
import { NodeData } from "../types/node";
import { getTreeDimensions } from "../utils/treeUtils";
import { NODE_WIDTH, NODE_HEIGHT, TREE_LEVEL_SPACING, TREE_SIBLING_SPACING } from "../utils/constants";

export const useTreeDimensions = (
  node: NodeData,
  nodesExpansionMap: Map<number, boolean>
) => {
  return useMemo(() => {
    return getTreeDimensions(node, NODE_WIDTH, NODE_HEIGHT, nodesExpansionMap, TREE_LEVEL_SPACING, TREE_SIBLING_SPACING);
  }, [node, nodesExpansionMap]);
};