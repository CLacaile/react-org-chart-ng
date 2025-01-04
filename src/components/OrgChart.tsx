import Tree from "./Tree";
import { NodeData } from "../types/node";
import { useExpansionMap } from "../hooks/useExpansionMap";
import Organization from "./Organization";
import { useTreeDimensions } from "../hooks/useTreeDimensions";
import { ORG_PADDING } from "../utils/constants";

interface OrgChartProps {
  data: NodeData;
  x?: number; 
  y?: number;
  scale?: number;
}

function OrgChart({ data, x = 0, y = 0, scale = 1 }: OrgChartProps) {
  const { expansionMap, toggleNodeExpansion } = useExpansionMap();
  const { treeWidth, treeHeight } = useTreeDimensions(data, expansionMap);
  
  return (
    <g
      data-testid="org-chart"
      className="org-chart"
      transform={`scale(${scale}) translate(${window.innerWidth/2}, ${0})`}
    >
      <Organization width={treeWidth + ORG_PADDING} height={treeHeight + ORG_PADDING} />
      <Tree
        rootNodeX={x}
        rootNodeY={y}
        rootNode={data}
        nodesExpansionMap={expansionMap}
        toggleNodeExpansion={toggleNodeExpansion}
      />
    </g>
  );
}

export default OrgChart;
