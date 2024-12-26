import { NodeData } from '../Node';

export function getSubtreeWidth(node: NodeData, leafWidth: number): number {
  if (node.children.length === 0) {
    return leafWidth; // Une feuille a une largeur fixe
  }
  // Largeur totale des sous-arbres des enfants
  return node.children.reduce((acc, child) => acc + getSubtreeWidth(child, leafWidth), 0);
}