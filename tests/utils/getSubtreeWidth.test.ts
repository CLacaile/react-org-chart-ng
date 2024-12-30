import { getSubtreeWidth } from "../../src/utils/treeUtils";
import { NodeData } from "../../src/types/node";

// Test data
const testNodeWithoutChildren: NodeData = {
  id: 1,
  text: "Test node 1",
  children: [],
};
const testNodeWithOneChild: NodeData = {
  id: 1,
  text: "Test node 1",
  children: [{ id: 2, text: "Test node 2", children: [] }],
};
const testNodeWithTwoChildren: NodeData = {
  id: 1,
  text: "Test node 1",
  children: [
    { id: 2, text: "Test node 2", children: [] },
    { id: 3, text: "Test node 3", children: [] },
  ],
};

describe("getSubtreeWidth", () => {
  it("returns the node width for a leaf node", () => {
    const width = getSubtreeWidth(testNodeWithoutChildren, 100, new Map(), 10);
    expect(width).toBe(100);
  });

  it("returns the node width if not expanded", () => {
    const nodesExpansionMap = new Map([[testNodeWithOneChild.id, false]]);
    const width = getSubtreeWidth(
      testNodeWithOneChild,
      100,
      nodesExpansionMap,
      10
    );
    expect(width).toBe(100);
  });

  it("calculates the correct width for expanded node with children", () => {
    const nodesExpansionMap = new Map([[testNodeWithTwoChildren.id, true]]);
    const width = getSubtreeWidth(
      testNodeWithTwoChildren,
      100,
      nodesExpansionMap,
      10
    );
    expect(width).toBe(210); // 100 + 100 + 10 (spacing)
  });
});
