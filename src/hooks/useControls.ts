import { useState, useCallback } from "react";

export function useControls() {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: 0 });
  const [scale, setScale] = useState(1);

  // Gérer le glissement (drag)
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      const startX = event.clientX - position.x;
      const startY = event.clientY - position.y;

      const onMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX - startX, y: e.clientY - startY });
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [position]
  );

  // Gérer le zoom (scroll wheel)
  const handleWheel = useCallback(
    (event: React.WheelEvent<SVGElement>) => {
      const zoomFactor = -0.001 * event.deltaY;
      const newScale = Math.min(Math.max(scale + zoomFactor, 0.5), 1);

      // Optionnel : Ajouter une logique pour centrer le zoom sur le curseur
      setScale(newScale);
    },
    [scale]
  );

  // Retourner les transformations et les gestionnaires d'événements
  return {
    transform: {
      position,
      scale,
    },
    handlers: {
      onMouseDown: handleMouseDown,
      onWheel: handleWheel,
    },
  };
}
