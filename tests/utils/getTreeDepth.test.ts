import { getTreeDepth } from '../../src/utils/treeUtils';
import { NodeData } from '../../src/types/node';

// Test data
const root: NodeData = {
    id: 1,
    text: "Test node 1",
    children: []
};
const threeLevelsTree: NodeData = {
    id: 1,
    text: "Test node 1",
    children: [
        { id: 2, text: "Test node 2", children: [] },
        {
            id: 3, text: "Test node 3", children: [
                { id: 4, text: "Test node 4", children: [] },
                { id: 5, text: "Test node 5", children: [] }
            ]
        }
    ]
}
const unbalancedTree: NodeData = {
    id: 1,
    text: "Test node 1",
    children: [
        {
            id: 2, text: "Test node 2", children: [
                {
                    id: 3, text: "Test node 3", children: [
                        { id: 4, text: "Test node 4", children: [] }
                    ]
                }
            ]
        },
        { id: 5, text: "Test node 5", children: [] }
    ]
}

describe('getTreeDepth', () => {
    // TODO : add a guard clause to handle empty trees
    /* it('should return 0 for an empty tree', () => {
        const tree = {} as NodeData;
        expect(getTreeDepth(tree)).toThrow();
    }); */

    it('should return 1 for a tree with only root node', () => {
        expect(getTreeDepth(root)).toBe(1);
    });

    it('should return correct depth for a tree with multiple levels', () => {
        expect(getTreeDepth(threeLevelsTree)).toBe(3);
    });

    it('should return correct depth for an unbalanced tree', () => {
        expect(getTreeDepth(unbalancedTree)).toBe(4);
    });
});