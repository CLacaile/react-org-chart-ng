import { useMemo } from "react";
import { NodeData } from "../components/Node";
import { getSubtreeWidth } from "../utils/treeUtils";
import * as CONSTANTS from "../utils/constants";

export const useSubtreeWidth = (
  node: NodeData,
  nodesExpansionMap: Map<number, boolean>
) => {
  return useMemo(() => {
    return getSubtreeWidth(node, CONSTANTS.nodeWidth, nodesExpansionMap, CONSTANTS.treeSiblingSpacing);
  }, [node, nodesExpansionMap]);
};