import Tree from "./Tree";
import { NodeData } from "./Node";

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
  

  return (
    <svg width="100%" height="100vh">
      <Tree data={data} />
    </svg>
  );
}

export default OrgChart;
