import { NodeData } from '../Node';

export function getSubtreeWidth(node: NodeData, nodeWidth: number, siblingSpacing: number): number {
  if (node.children.length === 0) {
    return nodeWidth; // Une feuille a une largeur fixe
  }

  // Largeur totale des enfants + espacement
  return (
    node.children.reduce(
      (acc, child) => acc + getSubtreeWidth(child, nodeWidth, siblingSpacing),
      0
    ) +
    (node.children.length - 1) * siblingSpacing
  );
}