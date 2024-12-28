import Tree from "./Tree";
import { NodeData } from "../components/Node";
import { useAutoZoom } from "../hooks/useAutoZoom";
import { useExpansionMap } from "../hooks/useExpansionMap";

interface OrgChartProps {
  data: NodeData;
  x?: number; // Position X de la racine
  y?: number; // Position Y de la racine
  levelSpacing?: number; // Espacement vertical entre niveaux
  siblingSpacing?: number; // Espacement horizontal entre frères et sœurs
}

function OrgChart({ data }: OrgChartProps) {
  const { expansionMap, toggleNodeExpansion } = useExpansionMap();
  const { scale, translateX, translateY, screenWidth, screenHeight } = useAutoZoom({data, expansionMap});

  return (
    <svg width="100%" height="100vh" viewBox={`0 0 ${screenWidth} ${screenHeight}`}>
      <g
        transform={`scale(${scale}) translate(${translateX}, ${translateY})`}
      >
        <Tree parent={data} x={400} y={10} nodesExpansionMap={expansionMap} toggleNodeExpansion={toggleNodeExpansion}/>
      </g>
    </svg>
  );
}

export default OrgChart;
