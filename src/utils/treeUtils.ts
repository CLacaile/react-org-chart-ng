import { NodeData } from '../components/Node';
import * as CONSTANTS from './constants';

export function getSubtreeWidth(node: NodeData, nodeWidth: number, siblingSpacing: number): number {
  if (node.children.length === 0) {
    return nodeWidth; // Une feuille a une largeur fixe
  }

  const childrenWidth = node.children.reduce(
    (acc, child) => acc + getSubtreeWidth(child, nodeWidth, siblingSpacing),
    0
  );
  const spacing = (node.children.length - 1) * CONSTANTS.treeSiblingSpacing;

  return childrenWidth + spacing;
}

export function getTreeDimensions(data: NodeData, nodeWidth: number, nodeHeight: number, levelSpacing: number, siblingSpacing: number) {
  const treeWidth = getSubtreeWidth(data, nodeWidth, siblingSpacing); // Largeur totale
  const treeHeight = getTreeDepth(data) * (nodeHeight + levelSpacing); // Hauteur totale
  return { treeWidth, treeHeight };
}

export function getTreeDepth(data: NodeData): number {
  if (data.children.length === 0) return 1;
  return 1 + Math.max(...data.children.map(getTreeDepth));
}