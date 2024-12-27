import Node from "./Node";
import { NodeData } from "./Node";
import * as CONSTANTS from "../utils/constants";
import { useChildPositions } from "../hooks/useChildPositions";
import { useMemo } from "react";
import { getSubtreeWidth } from "../utils/treeUtils";

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
      {/* Dessiner les liens */}
      {childPositions.map(({ child, x: childX, y: childY }, index) => (
        <g key={index}>
          <line
            x1={x}
            y1={y + CONSTANTS.nodeHeight}
            x2={childX}
            y2={childY}
            stroke={CONSTANTS.vertexStrokeColor}
            strokeWidth="1"
          />
          <Tree data={child} x={childX} y={childY} />
        </g>
      ))}

      {/* Dessiner le nœud actuel */}
      <Node x={x} y={y} text={data.text} />
    </g>
  );
}

export default Tree;
