import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface ControlsProps {
  children: React.ReactNode;
}

function Controls({ children }: ControlsProps) {
  const gRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const g = d3.select(gRef.current);
    const svg = g.node()?.closest("svg"); // Trouver la balise SVG parente

    if (svg) {
      const d3Svg = d3.select<SVGSVGElement, unknown>(svg);

      // Initialiser le comportement de zoom/pan
      const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.3, 1]) // Limiter le zoom entre 0.5x et 3x
        .on("zoom", (event) => {
          g.attr("transform", event.transform); // Appliquer les transformations (translate + scale)
        });

      d3Svg.call(zoomBehavior); // Attacher le comportement au SVG
    }
  }, []);

  return (
    <g className="controls" ref={gRef}>
      {children}
    </g>
  );
}

export default Controls;