import { useMemo } from "react";
import { DepartmentData } from "../types/department";
import { getSubDepartmentsWidth } from "../utils/departmentUtils";
import { DEPT_LEVEL_SPACING, DEPT_MIN_HEIGHT, DEPT_MIN_WIDTH, DEPT_SIBLING_SPACING } from "../utils/constants";

/**
 * Calculer les positions des enfants d'un nœud.
 */
export function useDepartmentsPositions(
  rootNode: DepartmentData,
  rootNodeX: number,
  rootNodeY: number,
  parentSubtreeWidth: number,
) {
  const isLeaf = rootNode.children.length === 0;

  return useMemo(() => {
    
    if (isLeaf) {
      return [];
    }

    let childXStart = rootNodeX - parentSubtreeWidth / 2;

    return rootNode.children.map((child) => {
      const childSubtreeWidth = getSubDepartmentsWidth(child, DEPT_MIN_WIDTH, DEPT_SIBLING_SPACING);
      const childX = childXStart + childSubtreeWidth / 2;
      const childY = rootNodeY + DEPT_MIN_HEIGHT + DEPT_LEVEL_SPACING;

      childXStart += childSubtreeWidth + DEPT_SIBLING_SPACING;

      return { child, x: childX, y: childY };
    });
  }, [rootNode, rootNodeX, rootNodeY, parentSubtreeWidth, isLeaf]);
}
