import { motion } from "framer-motion";
import { PersonData } from "../types/person";
import TextWrap from "./TextWrap";
import Avatar from "./Avatar";
import {
  PERSON_BG_COLOR,
  PERSON_HEIGHT,
  PERSON_STROKE_COLOR,
  PERSON_TEXT_COLOR,
  PERSON_WIDTH,
} from "../utils/constants";

interface PersonProps {
  data: PersonData;
  x: number;
  y: number;
  onClick?: () => void;
}

function Person({ data, x, y, onClick }: PersonProps) {
  const rectWidth = PERSON_WIDTH;
  const rectHeight = PERSON_HEIGHT;

  return (
    <motion.g
      id={`person-${data.id}`}
      data-testid={`person-${data.id}`}
      initial={{ x: x - rectWidth / 2, y, filter: "none" }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ cursor: "pointer" }}
      onClick={onClick}
      whileHover={{
        x: x - rectWidth / 2 - 1,
        y: y - 1,
        filter: "url(#softShadow)",
      }}
    >
      {/* Conteneur du nœud */}
      <rect
        className="person-container"
        width={rectWidth}
        height={rectHeight}
        stroke={PERSON_STROKE_COLOR}
        fill={PERSON_BG_COLOR}
        fillOpacity={0.5}
        rx="5"
      />
      {/* Avatar */}
      <Avatar />
      {/* Nom/prénom */}
      <TextWrap
        text={`${data.firstname} ${data.lastname}`}
        color={PERSON_TEXT_COLOR}
        font="Gabarito"
        size="small"
        weight="bold"
        maxWidth={PERSON_WIDTH - 125}
        position={{ x: rectWidth / 2, y: PERSON_HEIGHT / 4 }}
      />
      {/* Poste */}
      <TextWrap
        text="Poste"
        color={PERSON_TEXT_COLOR}
        font="Gabarito"
        size="small"
        maxWidth={PERSON_WIDTH - 125}
        position={{ x: rectWidth / 2, y: PERSON_HEIGHT / 4 + 20 }}
      />
    </motion.g>
  );
}

export default Person;
