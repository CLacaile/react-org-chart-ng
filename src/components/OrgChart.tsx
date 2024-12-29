import Tree from "./Tree";
import { NodeData } from "../components/Node";
import { useExpansionMap } from "../hooks/useExpansionMap";

interface OrgChartProps {
  data: NodeData;
  x?: number; 
  y?: number;
  scale?: number;
}

function OrgChart({ data, x = 0, y = 0, scale = 1 }: OrgChartProps) {
  const { expansionMap, toggleNodeExpansion } = useExpansionMap();
  return (
    <g
      className="org-chart"
      transform={`scale(${scale}) translate(${window.innerWidth/2}, ${0})`}
    >
      <Tree
        x={x}
        y={y}
        parent={data}
        nodesExpansionMap={expansionMap}
        toggleNodeExpansion={toggleNodeExpansion}
      />
    </g>
  );
}

export default OrgChart;
