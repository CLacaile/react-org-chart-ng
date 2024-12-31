import * as CONSTANTS from "../utils/constants";
import { motion } from "framer-motion";

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
    <motion.g 
      id={`node-${id}`} 
      data-testid={`node-${id}`} 
      initial={{ opacity: 0, x: x - rectWidth / 2, y }}
      animate={{ opacity: 1, x: x - rectWidth / 2, y }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onClick={onClick} 
      style={{ cursor: "pointer" }}
    >
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
    </motion.g>
  );
}

export default Node;
