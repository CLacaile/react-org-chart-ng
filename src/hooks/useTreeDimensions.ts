import { useMemo } from "react";
import { NodeData } from "../types/node";
import { getTreeDimensions } from "../utils/treeUtils";
import * as CONSTANTS from "../utils/constants";

export const useTreeDimensions = (
  node: NodeData,
  nodesExpansionMap: Map<number, boolean>
) => {
  return useMemo(() => {
    return getTreeDimensions(node, CONSTANTS.nodeWidth, CONSTANTS.nodeHeight, nodesExpansionMap, CONSTANTS.treeLevelSpacing, CONSTANTS.treeSiblingSpacing);
  }, [node, nodesExpansionMap]);
};