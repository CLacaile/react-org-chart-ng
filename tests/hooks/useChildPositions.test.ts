import { renderHook } from '@testing-library/react';
import { useChildPositions } from '../../src/hooks/useChildPositions';
import { getSubtreeWidth } from '../../src/utils/treeUtils';
import * as CONSTANTS from '../../src/utils/constants';

jest.mock('../../src/utils/treeUtils', () => ({
    getSubtreeWidth: jest.fn()
}));
const mockedGetSubtreeWidth = jest.mocked(getSubtreeWidth);

describe('useChildPositions', () => {
  beforeEach(() => {
    // Réinitialisez le mock avant chaque test
    mockedGetSubtreeWidth.mockReset();
  });

  it('returns an empty array if the node is a leaf', () => {
    const parent = { id: 1, text: 'Test Node', children: [] };  // Aucun enfant
    const { result } = renderHook(() => useChildPositions(parent, 100, 100, 50, new Map()));

    expect(result.current).toEqual([]);
  });

  it('returns an empty array if the node is not expanded', () => {
    const parent = { id: 1, text: 'Test Node', children: [{ id: 2, text: 'Child Test Node', children: [] }] };
    const nodesExpansionMap = new Map([[1, false]]);
    const { result } = renderHook(() => useChildPositions(parent, 100, 100, 50, nodesExpansionMap));

    expect(result.current).toEqual([]);
  });

  it('calculates correct positions for expanded and non-leaf node', () => {
    // GIVEN
    const parent = { id: 1, text: 'Test node 1', children: [{ id: 2, text: 'Test node 2', children: [] }] };
    const nodesExpansionMap = new Map([[1, true]]);
    mockedGetSubtreeWidth.mockReturnValue(30);  // Mock la largeur de l'arbre pour chaque enfant

    // WHEN
    const { result } = renderHook(() => useChildPositions(parent, 100, 100, 100, nodesExpansionMap));

    // THEN
    const expectedChildX = 100 - (100 / 2) + (30 / 2);
    const expectedChildY = 100 + CONSTANTS.nodeHeight + CONSTANTS.treeLevelSpacing;
    const expectedData = {child: parent.children[0], x: expectedChildX, y: expectedChildY};

    expect(getSubtreeWidth).toHaveBeenCalledWith(expectedData.child, CONSTANTS.nodeWidth, nodesExpansionMap, CONSTANTS.treeSiblingSpacing);

    expect(result.current).toEqual([expectedData]);
  });
});
