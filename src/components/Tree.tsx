import Node from "./Node";
import { NodeData } from "./Node";
import * as CONSTANTS from "../utils/constants";
import { useChildPositions } from "../hooks/useChildPositions";
import Vertex from "./Vertex";
import { useSubtreeWidth } from "../hooks/useSubtreeWidth";

interface TreeProps {
  parent: NodeData;
  x: number;
  y: number;
  nodesExpansionMap: Map<number, boolean>;
  toggleNodeExpansion: (nodeId: number) => void;
}

function Tree({ parent, x, y, nodesExpansionMap, toggleNodeExpansion }: TreeProps) {
  const isExpanded = nodesExpansionMap.get(parent.id);
  const subtreeWidth = useSubtreeWidth(parent, nodesExpansionMap);
  const childPositions = useChildPositions(parent, x, y, subtreeWidth, nodesExpansionMap);

  return (
    <g id={`tree-${parent.id}`}>
      {/* Dessiner le nœud parent */}
      <Node id={parent.id} x={x} y={y} text={parent.text} onClick={() => toggleNodeExpansion(parent.id)}/>

      {/* Dessiner les liens et les sous-arbres */}
      {isExpanded && childPositions.map(({ child, x: childX, y: childY }, index) => (
        <g id={`subtree-${parent.id}-${index}`} key={index}>
          <Vertex originId={parent.id} originX={x} originY={y + CONSTANTS.nodeHeight} destId={child.id} destX={childX} destY={childY}/>
          <Tree parent={child} x={childX} y={childY} nodesExpansionMap={nodesExpansionMap} toggleNodeExpansion={toggleNodeExpansion}/>
        </g>
      ))}
    </g>
  );
}

export default Tree;
