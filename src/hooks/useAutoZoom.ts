import { useState, useEffect, useMemo } from "react";
import { getTreeDimensions } from "../utils/treeUtils";

interface UseAutoZoomParams {
  data: any; // Structure de l'arbre
  nodeWidth: number;
  nodeHeight: number;
  treeLevelSpacing: number;
  treeSiblingSpacing: number;
}

/**
 * useAutoZoom est un hook qui calcule l'échelle et le décalage pour ajuster l'arbre à l'écran.
 * @param data Structure de l'arbre
 * @param nodeWidth Largeur d'un nœud
 * @param nodeHeight Hauteur d'un nœud
 * @param treeLevelSpacing Espacement vertical entre niveaux
 * @param treeSiblingSpacing Espacement horizontal entre frères et sœurs
 * @returns 
 */
export function useAutoZoom({ data, nodeWidth, nodeHeight, treeLevelSpacing, treeSiblingSpacing }: UseAutoZoomParams) {
  const [dimensions, setDimensions] = useState({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  });

  // Écouteur de redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Nettoyage de l'écouteur
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { screenWidth, screenHeight } = dimensions;

  // Calcul dynamique des dimensions de l'arbre
  const { treeWidth, treeHeight } = useMemo(() => {
    return getTreeDimensions(data, nodeWidth, nodeHeight, treeLevelSpacing, treeSiblingSpacing);
  }, [data, nodeWidth, nodeHeight, treeLevelSpacing]);

  // Calcul de l'échelle pour ajuster l'arbre à l'écran
  const scale = useMemo(() => {
    return Math.min(screenWidth / treeWidth, screenHeight / treeHeight);
  }, [screenWidth, screenHeight, treeWidth, treeHeight]);
  const clampedScale = Math.min(Math.max(scale, 0), 1);

  // Décalage pour centrer l'arbre
  const translateX = (screenWidth / clampedScale - treeWidth) / 2;
  const translateY = (screenHeight / clampedScale - treeHeight) / 2;

  return { scale: clampedScale, translateX, translateY, screenWidth, screenHeight };
}
