import { PersonData } from '../types/person';

/**
 * getSubtreeWidth calcule la largeur du sous-arbre pour un nœud donné.
 * @param root le nœud pour lequel calculer la largeur du sous-arbre
 * @param nodeWidth la largeur d'un nœud
 * @param nodesExpansionMap la carte d'expansion des nœuds indiquant si un nœud est étendu ou non
 * @param siblingSpacing l'espace horizontal entre les frères et sœurs
 * @returns la largeur du sous-arbre pour le nœud donné
 */
export function getTeamWidth(root: PersonData, nodeWidth: number, nodesExpansionMap: Map<number, boolean>, siblingSpacing: number): number {
  const isLeaf = root.children.length === 0;
  const isExpanded = nodesExpansionMap.get(root.id) || false;

  if (isLeaf || !isExpanded) {
    return nodeWidth; // Une feuille a une largeur fixe
  }

  const childrenWidth = root.children.reduce(
    (acc, child) => acc + getTeamWidth(child, nodeWidth, nodesExpansionMap, siblingSpacing),
    0
  );
  const spacing = (root.children.length - 1) * siblingSpacing;

  return childrenWidth + spacing;
}

export function getTeamDimensions(root: PersonData, nodeWidth: number, nodeHeight: number, ExpansionMap: Map<number, boolean>, levelSpacing: number, siblingSpacing: number) {
  const treeWidth = getTeamWidth(root, nodeWidth, ExpansionMap, siblingSpacing); // Largeur totale
  const treeHeight = getTeamDepth(root, ExpansionMap) * (nodeHeight + levelSpacing); // Hauteur totale
  return { treeWidth, treeHeight };
}

export function getTeamDepth(root: PersonData, expansionMap: Map<number, boolean>): number {
  const isLeaf = root.children.length === 0;
  const isExpanded = expansionMap.get(root.id) || false;

  if (isLeaf || !isExpanded) return 1;

  return 1 + Math.max(...root.children.map((child) => getTeamDepth(child, expansionMap)));
}

/**
 * Initialise l'état d'expansion des nœuds.
 * @param rootNode Le nœud racine de l'arbre.
 * @param expanded Par défaut, tous les nœuds seront dépliés si `true`.
 * @returns Une Map contenant l'état d'expansion initial de chaque nœud.
 */

export function initTeamMembersExpansionMap(rootNode: PersonData, expanded = true): Map<number, boolean> {
  const expansionMap = new Map<number, boolean>();

  const traverse = (node: PersonData) => {
    expansionMap.set(node.id, expanded);
    node.children.forEach(traverse);
  };

  traverse(rootNode);

  return expansionMap;
}
