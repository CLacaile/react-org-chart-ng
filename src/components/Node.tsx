import * as CONSTANTS from "../utils/constants";

interface NodeProps {
  x: number;
  y: number;
  text: string;
  onClick?: () => void;
}

export interface NodeData {
  id: number;
  text: string;
  children: NodeData[];
}

function Node({ x, y, text, onClick }: NodeProps) {
  const rectWidth = CONSTANTS.nodeWidth;
  const rectHeight = CONSTANTS.nodeHeight;

  return (
    <g transform={`translate(${x - rectWidth / 2}, ${y})`} onClick={onClick} style={{ cursor: "pointer" }}>
      {/* Conteneur du nœud */}
      <rect
        width={rectWidth}
        height={rectHeight}
        stroke={CONSTANTS.nodeStrokeColor}
        fill={CONSTANTS.nodeBackgroundColor}
        fillOpacity={0.5}
        rx="5"
      />
      {/* Texte dans le nœud */}
      <text
        x={rectWidth / 2}
        y={rectHeight / 2}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={CONSTANTS.nodeTextColor}
      >
        {text}
      </text>
    </g>
  );
}

export default Node;
