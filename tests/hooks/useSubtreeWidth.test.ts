import { renderHook } from "@testing-library/react";
import { useSubtreeWidth } from "../../src/hooks/useSubtreeWidth";
import { getSubtreeWidth } from "../../src/utils/treeUtils";
import * as CONSTANTS from "../../src/utils/constants";

jest.mock("../../src/utils/treeUtils", () => ({
  getSubtreeWidth: jest.fn(),
}));
const mockedGetSubtreeWidth = jest.mocked(getSubtreeWidth);

describe("useSubtreeWidth", () => {
  beforeEach(() => {
    mockedGetSubtreeWidth.mockClear();
  });

  it("calculates the subtree width correctly", () => {
    const node = { id: 1, text: "Root Node", children: [] };
    const nodesExpansionMap = new Map();
    nodesExpansionMap.set(1, true);

    // Setup mock return value
    mockedGetSubtreeWidth.mockReturnValue(200);

    const { result } = renderHook(() =>
      useSubtreeWidth(node, nodesExpansionMap)
    );

    expect(result.current).toBe(200);
    expect(getSubtreeWidth).toHaveBeenCalledWith(
      node,
      CONSTANTS.nodeWidth,
      nodesExpansionMap,
      CONSTANTS.treeSiblingSpacing
    );
  });

  it("recalculates the width when the node changes", () => {
    const node1 = { id: 1, text: "Root Node", children: [] };
    const node2 = { id: 2, text: "Child Node", children: [] };
    const nodesExpansionMap = new Map();

    mockedGetSubtreeWidth.mockReturnValueOnce(200).mockReturnValueOnce(300);
    const { result, rerender } = renderHook(
      ({ node, nodesExpansionMap }) => useSubtreeWidth(node, nodesExpansionMap),
      {
        initialProps: { node: node1, nodesExpansionMap },
      }
    );

    expect(result.current).toBe(200);

    // Rerender with new node
    rerender({ node: node2, nodesExpansionMap });
    expect(result.current).toBe(300);
    expect(getSubtreeWidth).toHaveBeenCalledTimes(2);
  });
});
