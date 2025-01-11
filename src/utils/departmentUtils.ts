import { DepartmentData } from "../types/department";

export function getSubDepartmentsWidth(root: DepartmentData, departmentWidth: number, siblingSpacing: number): number {
  const isLeaf = root.children.length === 0;

  if (isLeaf) {
    return departmentWidth; // Une feuille a une largeur fixe
  }

  const childrenWidth = root.children.reduce(
    (acc, child) => acc + getSubDepartmentsWidth(child, departmentWidth, siblingSpacing),
    0
  );
  const spacing = (root.children.length - 1) * siblingSpacing;

  return childrenWidth + spacing;
}