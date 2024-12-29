import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Tree from "../../src/components/Tree";
import { NodeData } from "../../src/types/node";
import { useSubtreeWidth } from "../../src/hooks/useSubtreeWidth";
import { useChildPositions } from "../../src/hooks/useChildPositions";

// Mock des hooks
jest.mock("../../src/hooks/useSubtreeWidth", () => ({
  useSubtreeWidth: jest.fn(),
}));
const mockedUseSubtreeWidth = jest.mocked(useSubtreeWidth);

jest.mock("../../src/hooks/useChildPositions", () => ({
  useChildPositions: jest.fn(),
}));
const mockedUseChildPositions = jest.mocked(useChildPositions);

// Données de test
const nodeData: NodeData = {
  id: 1,
  text: "Root Node",
  children: [],
};
const nodesExpansionMap = new Map<number, boolean>();

describe("Tree", () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    mockedUseSubtreeWidth.mockClear();
    mockedUseChildPositions.mockClear();
    nodesExpansionMap.clear();
  });

  it("renders the root node correctly", () => {
    render(
      <svg>
        <Tree
          parent={nodeData}
          x={100}
          y={100}
          nodesExpansionMap={nodesExpansionMap}
          toggleNodeExpansion={jest.fn()}
        />
      </svg>
    );
    expect(screen.getByText("Root Node")).toBeInTheDocument();
  });

  it("expands and collapses on click", () => {
    const toggleNodeExpansion = jest.fn();
    render(
      <svg>
        <Tree
          parent={nodeData}
          x={100}
          y={100}
          nodesExpansionMap={nodesExpansionMap}
          toggleNodeExpansion={toggleNodeExpansion}
        />
      </svg>
    );

    const nodeElement = screen.getByText("Root Node");
    fireEvent.click(nodeElement);
    expect(toggleNodeExpansion).toHaveBeenCalledWith(nodeData.id);
  });

  it("renders child nodes when expanded", () => {
    nodesExpansionMap.set(nodeData.id, true); // Simuler l'expansion du nœud
    mockedUseSubtreeWidth.mockReturnValue(200); // Largeur simulée du sous-arbre
    mockedUseChildPositions.mockReturnValue([
      { child: { id: 2, text: "Child Node", children: [] }, x: 150, y: 200 },
    ]); // Position simulée de l'enfant

    render(
      <svg>
        <Tree
          parent={nodeData}
          x={100}
          y={100}
          nodesExpansionMap={nodesExpansionMap}
          toggleNodeExpansion={jest.fn()}
        />
      </svg>
    );
    expect(screen.getByText("Child Node")).toBeInTheDocument();
  });
});
