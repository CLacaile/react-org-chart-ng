import { NodeData } from '../../src/types/node';
import { getTreeDimensions } from '../../src/utils/treeUtils';

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

// WARNING
// getTreeDepth and getSubtreeWidth should be mocked in order to test getTreeDimensions but I couldn't get it to work. 
// I guess the two following tests are better than nothing (is it?).

describe('getTreeDimensions', () => {
  it('calculates 1-level tree dimensions correctly', () => {

    const dimensions = getTreeDimensions(testNodeWithoutChildren, 300, 50, new Map(), 20, 10);

    expect(dimensions).toEqual({ treeWidth: 300, treeHeight: 70 }); 
  });

  it('calculates 2-level tree dimensions correctly', () => {

    const dimensions = getTreeDimensions(testNodeWithOneChild, 300, 50, new Map(), 20, 10);

    expect(dimensions).toEqual({ treeWidth: 300, treeHeight: 140 });
  });
});
