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