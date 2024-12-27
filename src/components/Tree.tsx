import { useState } from "react";
import Node from "./Node";
import { NodeData } from "./Node";
import * as CONSTANTS from "../utils/constants";
import { useChildPositions } from "../hooks/useChildPositions";
import { useMemo } from "react";
import { getSubtreeWidth } from "../utils/treeUtils";
import Vertex from "./Vertex";

interface TreeProps {
  data: NodeData;
  x: number;
  y: number;
}

function Tree({ data, x, y }: TreeProps) {
  const [expanded, setExpanded] = useState(false);
  const isLeaf = data.children.length === 0;
  const subtreeWidth = useMemo(() => getSubtreeWidth(data, CONSTANTS.nodeWidth, CONSTANTS.treeSiblingSpacing), [data]);
  const childPositions = useChildPositions(data, x, y, subtreeWidth);

  const handleNodeClick = () => {
    if (!isLeaf) {
      setExpanded(!expanded);
    }
  }

  return (
    <g>
      {/* Dessiner le nœud */}
      <Node x={x} y={y} text={data.text} onClick={handleNodeClick}/>

      {/* Dessiner les liens et les sous-arbres */}
      {expanded && childPositions.map(({ child, x: childX, y: childY }, index) => (
        <g key={index}>
          <Vertex x={x} y={y + CONSTANTS.nodeHeight} childX={childX} childY={childY}/>
          <Tree data={child} x={childX} y={childY} />
        </g>
      ))}
    </g>
  );
}

export default Tree;
