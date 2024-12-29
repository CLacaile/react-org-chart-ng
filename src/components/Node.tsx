import * as CONSTANTS from "../utils/constants";

interface NodeProps {
  id: number;
  x: number;
  y: number;
  text: string;
  onClick?: () => void;
}

function Node({ id, x, y, text, onClick }: NodeProps) {
  const rectWidth = CONSTANTS.nodeWidth;
  const rectHeight = CONSTANTS.nodeHeight;

  return (
    <g id={`node-${id}`} data-testid={`node-${id}`} transform={`translate(${x - rectWidth / 2}, ${y})`} onClick={onClick} style={{ cursor: "pointer" }}>
      {/* Conteneur du nœud */}
      <rect
        className="node-container"
        width={rectWidth}
        height={rectHeight}
        stroke={CONSTANTS.nodeStrokeColor}
        fill={CONSTANTS.nodeBackgroundColor}
        fillOpacity={0.5}
        rx="5"
      />
      {/* Texte dans le nœud */}
      <text
        className="node-text"
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
