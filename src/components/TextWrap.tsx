import React, { useEffect } from "react";
import { wrapText } from "../utils/svgUtils";
import { NODE_TEXT_COLOR } from "../utils/constants";

interface TextWrapProps {
  text: string;
  color: string;
  font: string;
  size: string;
  weight?: string;
  maxWidth: number;
  position: { x: number; y: number };
}

function TextWrap({
  text,
  color = NODE_TEXT_COLOR,
  font,
  size = "normal",
  weight = "normal",
  position,
  maxWidth,
}: TextWrapProps) {
  const [wrappedText, setWrappedText] = React.useState<string[]>([]);
  useEffect(() => {
    setWrappedText(wrapText(text, maxWidth));
  }, [text, maxWidth]);
  return (
    <text
      className="node-text"
      x={position.x}
      y={position.y}
      textAnchor="middle"
      alignmentBaseline="middle"
      fill={color}
      fontSize={size}
      fontWeight={weight}
      style={{ fontFamily: font }}
    >
      {wrappedText?.map((line, index) => (
        <tspan
          key={index}
          x={position.x}
          dy={index === 0 ? position.y : "1.2em"}
        >
          {line}
        </tspan>
      ))}
    </text>
  );
}

export default TextWrap;
