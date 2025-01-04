import * as CONSTANTS from "../utils/constants";
import { motion } from "framer-motion";
import SoftShadow from "./filters/SoftShadow";
import { NodeData } from "../types/node";
import TextWrap from "./TextWrap";
import Avatar from "./Avatar";

interface NodeProps {
  data: NodeData
  x: number;
  y: number;
  onClick?: () => void;
}

function Node({ data, x, y, onClick }: NodeProps) {
  const rectWidth = CONSTANTS.nodeWidth;
  const rectHeight = CONSTANTS.nodeHeight;

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
          stroke={CONSTANTS.nodeStrokeColor}
          fill={CONSTANTS.nodeBackgroundColor}
          fillOpacity={0.5}
          rx="5"
        />
        { /* Avatar */}
        <Avatar />
        {/* Nom/prénom */}
        <TextWrap
          text={`${data.firstname} ${data.lastname}`}
          color={CONSTANTS.nodeTextColor}
          font="Gabarito"
          size="small"
          weight="bold"
          maxWidth={CONSTANTS.nodeWidth - 125}
          position={{ x: rectWidth / 2, y: CONSTANTS.nodeHeight / 4 }}
        />
        {/* Poste */}
        <TextWrap
          text="Poste"
          color={CONSTANTS.nodeTextColor}
          font="Gabarito"
          size="small"
          maxWidth={CONSTANTS.nodeWidth - 125}
          position={{ x: rectWidth / 2, y: CONSTANTS.nodeHeight / 4 + 20 }}
        />
        
      </motion.g>
      <SoftShadow />
    </>
  );
}

export default Node;
