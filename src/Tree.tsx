import Node from "./Node";
import { NodeData } from "./Node";
import * as CONSTANTS from "./utils/constants";
import { getSubtreeWidth } from "./utils/treeUtils";

interface TreeProps {
  data: NodeData;
  x?: number;
  y?: number;
}

function Tree({ data, x = 500, y = 60 }: TreeProps) {
  // Vérifie si le nœud est une feuille
  const isLeaf = data.children.length === 0;

  // Largeur totale des enfants
  const subtreeWidth = isLeaf
    ? CONSTANTS.nodeWidth
    : data.children.reduce((acc, child) => acc + getSubtreeWidth(child, CONSTANTS.nodeWidth), 0);

  // Position X de départ pour les enfants
  let childXStart = x - subtreeWidth / 2;

  return (
    <g>
      {/* Dessiner les liens entre le parent et les enfants */}
      {data.children.map((child, index) => {
        const childSubtreeWidth = getSubtreeWidth(child, CONSTANTS.nodeWidth);
        const childX = childXStart + childSubtreeWidth / 2;
        const childY = y + CONSTANTS.nodeHeight + CONSTANTS.treeLevelSpacing;

        // Met à jour la position de départ pour le prochain enfant
        childXStart += childSubtreeWidth;

        return (
          <g key={index}>
            {/* Ligne reliant le parent à l'enfant */}
            <line
              x1={x}
              y1={y + CONSTANTS.nodeHeight} // Décalage pour aligner sous le nœud
              x2={childX}
              y2={childY} // Décalage pour aligner au-dessus de l'enfant
              stroke={CONSTANTS.vertexStrokeColor}
              strokeWidth="1"
            />
            {/* Rendu récursif de l'enfant avec une profondeur accrue */}
            <Tree data={child} x={childX} y={childY} />
          </g>
        );
      })}

      {/* Dessiner le nœud actuel */}
      <Node x={x} y={y} text={data.text} />
    </g>
  );
}

export default Tree;
