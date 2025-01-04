import { NodeData } from '../types/node';

/**
 * getSubtreeWidth calcule la largeur du sous-arbre pour un nœud donné.
 * @param root le nœud pour lequel calculer la largeur du sous-arbre
 * @param nodeWidth la largeur d'un nœud
 * @param nodesExpansionMap la carte d'expansion des nœuds indiquant si un nœud est étendu ou non
 * @param siblingSpacing l'espace horizontal entre les frères et sœurs
 * @returns la largeur du sous-arbre pour le nœud donné
 */
export function getSubtreeWidth(root: NodeData, nodeWidth: number, nodesExpansionMap: Map<number, boolean>, siblingSpacing: number): number {
  const isLeaf = root.children.length === 0;
  const isExpanded = nodesExpansionMap.get(root.id) || false;

  if (isLeaf || !isExpanded) {
    return nodeWidth; // Une feuille a une largeur fixe
  }

  const childrenWidth = root.children.reduce(
    (acc, child) => acc + getSubtreeWidth(child, nodeWidth, nodesExpansionMap, siblingSpacing),
    0
  );
  const spacing = (root.children.length - 1) * siblingSpacing;

  return childrenWidth + spacing;
}

export function getTreeDimensions(root: NodeData, nodeWidth: number, nodeHeight: number, nodesExpansionMap: Map<number, boolean>, levelSpacing: number, siblingSpacing: number) {
  const treeWidth = getSubtreeWidth(root, nodeWidth, nodesExpansionMap, siblingSpacing); // Largeur totale
  const treeHeight = getTreeDepth(root, nodesExpansionMap) * (nodeHeight + levelSpacing); // Hauteur totale
  return { treeWidth, treeHeight };
}

export function getTreeDepth(root: NodeData, nodesExpansionMap: Map<number, boolean>): number {
  const isLeaf = root.children.length === 0;
  const isExpanded = nodesExpansionMap.get(root.id) || false;

  if (isLeaf || !isExpanded) return 1;

  return 1 + Math.max(...root.children.map((child) => getTreeDepth(child, nodesExpansionMap)));
}