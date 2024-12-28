import { NodeData } from '../components/Node';

/**
 * getSubtreeWidth calcule la largeur du sous-arbre pour un nœud donné.
 * @param node le nœud pour lequel calculer la largeur du sous-arbre
 * @param nodeWidth la largeur d'un nœud
 * @param nodesExpansionMap la carte d'expansion des nœuds indiquant si un nœud est étendu ou non
 * @param siblingSpacing l'espace horizontal entre les frères et sœurs
 * @returns la largeur du sous-arbre pour le nœud donné
 */
export function getSubtreeWidth(node: NodeData, nodeWidth: number, nodesExpansionMap: Map<number, boolean>, siblingSpacing: number): number {
  const isLeaf = node.children.length === 0;
  const isExpanded = nodesExpansionMap.get(node.id) || false;

  if (isLeaf || !isExpanded) {
    return nodeWidth; // Une feuille a une largeur fixe
  }

  const childrenWidth = node.children.reduce(
    (acc, child) => acc + getSubtreeWidth(child, nodeWidth, nodesExpansionMap, siblingSpacing),
    0
  );
  const spacing = (node.children.length - 1) * siblingSpacing;

  return childrenWidth + spacing;
}

export function getTreeDimensions(data: NodeData, nodeWidth: number, nodeHeight: number, nodesExpansionMap: Map<number, boolean>, levelSpacing: number, siblingSpacing: number) {
  const treeWidth = getSubtreeWidth(data, nodeWidth, nodesExpansionMap, siblingSpacing); // Largeur totale
  const treeHeight = getTreeDepth(data) * (nodeHeight + levelSpacing); // Hauteur totale
  return { treeWidth, treeHeight };
}

export function getTreeDepth(data: NodeData): number {
  if (data.children.length === 0) return 1;
  return 1 + Math.max(...data.children.map(getTreeDepth));
}