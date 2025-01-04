import { NodeData } from "../types/node";

/**
 * Initialise l'état d'expansion des nœuds.
 * @param rootNode Le nœud racine de l'arbre.
 * @param expanded Par défaut, tous les nœuds seront dépliés si `true`.
 * @returns Une Map contenant l'état d'expansion initial de chaque nœud.
 */
export function initializeExpansionMap(rootNode: NodeData, expanded = true): Map<number, boolean> {
  const expansionMap = new Map<number, boolean>();

  const traverse = (node: NodeData) => {
    expansionMap.set(node.id, expanded);
    node.children.forEach(traverse);
  };

  traverse(rootNode);

  return expansionMap;
}
