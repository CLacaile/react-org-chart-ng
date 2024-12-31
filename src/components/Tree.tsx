import Node from "./Node";
import { NodeData } from "../types/node";
import * as CONSTANTS from "../utils/constants";
import { useChildPositions } from "../hooks/useChildPositions";
import Vertex from "./Vertex";
import { useSubtreeWidth } from "../hooks/useSubtreeWidth";
import { motion } from "framer-motion";

interface TreeProps {
  rootNode: NodeData;
  x: number;
  y: number;
  nodesExpansionMap: Map<number, boolean>;
  toggleNodeExpansion: (nodeId: number) => void;
}

function Tree({
  rootNode,
  x,
  y,
  nodesExpansionMap,
  toggleNodeExpansion,
}: TreeProps) {
  console.log("Rendering Tree", rootNode);
  const isExpanded = nodesExpansionMap.get(rootNode.id);
  const subtreeWidth = useSubtreeWidth(rootNode, nodesExpansionMap);
  const childPositions = useChildPositions(
    rootNode,
    x,
    y,
    subtreeWidth,
    nodesExpansionMap
  );

  return (
    <g id={`tree-${rootNode.id}`}>
      {/* Dessiner le nœud parent */}
      <Node
        id={rootNode.id}
        x={x}
        y={y}
        text={rootNode.text}
        onClick={() => toggleNodeExpansion(rootNode.id)}
      />

      {/* Dessiner les liens et les sous-arbres */}
      {isExpanded &&
        childPositions.map(({ child, x: childX, y: childY }, index) => (
          <g id={`subtree-${rootNode.id}-${index}`} key={index}>
            <Vertex
              originId={rootNode.id}
              originX={x}
              originY={y + CONSTANTS.nodeHeight}
              destId={child.id}
              destX={childX}
              destY={childY}
            />
            <motion.g
              id={`motion-subtree-${rootNode.id}-${index}`}
              key={index}
              initial={{ x: 0, y: 0 }}
              animate={{ x: childX, y: childY }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Tree
                rootNode={child}
                x={0}
                y={0}
                nodesExpansionMap={nodesExpansionMap}
                toggleNodeExpansion={toggleNodeExpansion}
              />
            </motion.g>
          </g>
        ))}
    </g>
  );
}

export default Tree;
