import Tree from "./Tree";
import { NodeData } from "../components/Node";
import { useExpansionMap } from "../hooks/useExpansionMap";

interface OrgChartProps {
  data: NodeData;
  position: { x: number; y: number };
  scale: number;
}

function OrgChart({ data, position, scale }: OrgChartProps) {
  const { expansionMap, toggleNodeExpansion } = useExpansionMap();
  return (
    <g
      transform={`scale(${scale}) translate(${position.x}, ${position.y}) scale(${scale})`}
    >
      <Tree
        x={0}
        y={0}
        parent={data}
        nodesExpansionMap={expansionMap}
        toggleNodeExpansion={toggleNodeExpansion}
      />
    </g>
  );
}

export default OrgChart;
