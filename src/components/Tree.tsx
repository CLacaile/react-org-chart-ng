import Node from "./Node";
import { NodeData } from "./Node";
import * as CONSTANTS from "../utils/constants";
import { useChildPositions } from "../hooks/useChildPositions";
import { useMemo } from "react";
import { getSubtreeWidth } from "../utils/treeUtils";
import Vertex from "./Vertex";

interface TreeProps {
  data: NodeData;
  x?: number;
  y?: number;
}

function Tree({ data, x = 600, y = 60 }: TreeProps) {
  // Largeur totale du sous-arbre via le hook
  const subtreeWidth = useMemo(() => getSubtreeWidth(data, CONSTANTS.nodeWidth, CONSTANTS.treeSiblingSpacing), [data]);

  // Positions des enfants via le hook
  const childPositions = useChildPositions(data, x, y, subtreeWidth);

  return (
    <g>
      {/* Dessiner les liens et les sous-arbres */}
      {childPositions.map(({ child, x: childX, y: childY }, index) => (
        <g key={index}>
          <Vertex x={x} y={y} childX={childX} childY={childY}/>
          <Tree data={child} x={childX} y={childY} />
        </g>
      ))}

      {/* Dessiner le nœud actuel */}
      <Node x={x} y={y} text={data.text} />
    </g>
  );
}

export default Tree;
