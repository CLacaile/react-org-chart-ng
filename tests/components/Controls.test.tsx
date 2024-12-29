// Mock de D3 simplifié
jest.mock('d3', () => ({
  select: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    call: jest.fn().mockReturnThis(),
    node: jest.fn(() => ({
      closest: jest.fn(() => document.createElement("svg"))
    }))
  })),
  zoom: jest.fn(() => {
    const zoomBehavior = {
      scaleExtent: jest.fn().mockReturnThis(),
      on: jest.fn().mockReturnThis()
    };
    return zoomBehavior;
  })
}));


import * as d3 from "d3";
import React from "react";
import { render } from "@testing-library/react";
import Controls from "../../src/components/Controls";

describe('Controls', () => {
  it('attaches zoom behavior to the parent SVG', () => {
    const { container } = render(
      <svg>
        <Controls>
          <circle cx="50" cy="50" r="40" />
        </Controls>
      </svg>
    );

    // Vérifier que l'élément SVG est bien présent
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeTruthy(); // Vérifiez que l'élément SVG existe

    // Vérifie que la sélection D3 est faite sur l'élément SVG
    expect(d3.select).toHaveBeenCalled();

    // Vérifie que le zoom est initialisé
    expect(d3.zoom).toHaveBeenCalled();
  });
});
