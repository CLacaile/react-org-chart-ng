import { motion } from "framer-motion";
import SoftShadow from "./filters/SoftShadow";
import { NodeData } from "../types/node";
import TextWrap from "./TextWrap";
import Avatar from "./Avatar";
import { NODE_BG_COLOR, NODE_HEIGHT, NODE_STROKE_COLOR, NODE_TEXT_COLOR, NODE_WIDTH } from "../utils/constants";

interface NodeProps {
  data: NodeData
  x: number;
  y: number;
  onClick?: () => void;
}

function Node({ data, x, y, onClick }: NodeProps) {
  const rectWidth = NODE_WIDTH;
  const rectHeight = NODE_HEIGHT;

  return (
    <>
      <motion.g
        id={`node-${data.id}`}
        data-testid={`node-${data.id}`}
        initial={{ opacity: 0, x: x - rectWidth / 2, y }}
        animate={{ opacity: 1, x: x - rectWidth / 2, y }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        style={{ cursor: "pointer", filter: "url(#softShadow)" }}
        onClick={onClick}
        whileHover={{
          rotateY: 10,
          rotateZ: 1,
          transition: { type: "spring", stiffness: 100 },
        }}
      >
        {/* Conteneur du nœud */}
        <rect
          className="node-container"
          width={rectWidth}
          height={rectHeight}
          stroke={NODE_STROKE_COLOR}
          fill={NODE_BG_COLOR}
          fillOpacity={0.5}
          rx="5"
        />
        { /* Avatar */}
        <Avatar />
        {/* Nom/prénom */}
        <TextWrap
          text={`${data.firstname} ${data.lastname}`}
          color={NODE_TEXT_COLOR}
          font="Gabarito"
          size="small"
          weight="bold"
          maxWidth={NODE_WIDTH - 125}
          position={{ x: rectWidth / 2, y: NODE_HEIGHT / 4 }}
        />
        {/* Poste */}
        <TextWrap
          text="Poste"
          color={NODE_TEXT_COLOR}
          font="Gabarito"
          size="small"
          maxWidth={NODE_WIDTH - 125}
          position={{ x: rectWidth / 2, y: NODE_HEIGHT / 4 + 20 }}
        />
        
      </motion.g>
      <SoftShadow />
    </>
  );
}

export default Node;
