import { DARKGREY, WHITE } from "../utils/palette";
import TextWrap from "./TextWrap";
import { motion } from "framer-motion";

interface OrganizationProps {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth?: number;
  onClick?: () => void;
}

function Organization({
  text,
  x,
  y,
  width,
  height,
  minWidth = width,
  onClick,
}: OrganizationProps) {
  return (
    <motion.g
      className="organization"
      initial={{ x, y, filter: "none" }}
      whileHover={{
        x: x - 1,
        y: y - 1,
        filter: "url(#softShadow)",
      }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <rect
        width={width < minWidth ? minWidth : width}
        height={height}
        rx="5"
        fill={WHITE}
        stroke={DARKGREY}
        style={{ cursor: "pointer" }}
      />
      <TextWrap
        position={{ x: width / 2, y: 15 }}
        maxWidth={200}
        text={text}
        weight="bold"
      />
    </motion.g>
  );
}

export default Organization;
