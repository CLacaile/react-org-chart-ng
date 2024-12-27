import Tree from "./Tree";
import { NodeData } from "../components/Node";
import { useAutoZoom } from "../hooks/useAutoZoom";
import * as CONSTANTS from "../utils/constants";

interface OrgChartProps {
  data: NodeData;
  x?: number; // Position X de la racine
  y?: number; // Position Y de la racine
  levelSpacing?: number; // Espacement vertical entre niveaux
  siblingSpacing?: number; // Espacement horizontal entre frères et sœurs
}

function OrgChart({
  data
}: OrgChartProps) {
  const { scale, translateX, translateY, screenWidth, screenHeight } = useAutoZoom({
    data,
    nodeWidth: CONSTANTS.nodeWidth,
    nodeHeight: CONSTANTS.nodeHeight,
    treeLevelSpacing: CONSTANTS.treeLevelSpacing,
    treeSiblingSpacing: CONSTANTS.treeSiblingSpacing
  });
  
  return (
    <svg width="100%" height="100vh" viewBox={`0 0 ${screenWidth} ${screenHeight}`}>
      <g
        transform={`scale(${scale}) translate(${translateX}, ${translateY})`}
      >
        <Tree data={data} x={screenWidth/2} y={10} />
      </g>
    </svg>
  );
}

export default OrgChart;
