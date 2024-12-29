import React from "react";
import { render, screen } from "@testing-library/react";
import { useExpansionMap } from "../../src/hooks/useExpansionMap";
import { NodeData } from "../../src/types/node";
import OrgChart from "../../src/components/OrgChart";

// Mock des hooks
jest.mock("../../src/hooks/useExpansionMap", () => ({
  useExpansionMap: jest
    .fn()
    .mockReturnValue({ expansionMap: {}, toggleNodeExpansion: jest.fn() }),
}));
const mockedUseExpansionMap = jest.mocked(useExpansionMap);

// Mock des composants enfants
jest.mock("../../src/components/Tree", () => {
  return {
    __esModule: true,
    default: jest.fn(() => <g data-testid="mocked-tree" />),
  }
});
import mockedTree from "../../src/components/Tree";

describe("OrgChart", () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    mockedUseExpansionMap.mockClear();
  });

  it("renders Tree with correct props", () => {
    const data: NodeData = { id: 1, text: "Root Node", children: [] };
    render(<svg><OrgChart data={data} x={100} y={200} scale={2} /></svg>);

    const { expansionMap, toggleNodeExpansion } = useExpansionMap();

    expect(screen.getByTestId("mocked-tree")).toBeInTheDocument();
    expect(mockedTree).toHaveBeenCalledWith(
      {
        x: 100,
        y: 200,
        parent: data,
        nodesExpansionMap: expansionMap,
        toggleNodeExpansion: toggleNodeExpansion,
      },
      expect.any(Object)
    ); // React Testing Library passes other props that React internally uses.
  });

  it("applies correct transform properties", () => {
    render(
      <svg>
        <OrgChart data={{ id: 1, text: "Root Node", children: [] }} scale={1.5} />
      </svg>
    );
    const orgChart = screen.getByTestId("org-chart");

    expect(orgChart).toHaveAttribute(
      "transform",
      `scale(1.5) translate(${window.innerWidth / 2}, 0)`
    );
  });
});
