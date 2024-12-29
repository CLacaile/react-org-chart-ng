import React from 'react';
import { render, screen } from '@testing-library/react';
import Vertex from '../../src/components/Vertex';
import * as CONSTANTS from '../../src/utils/constants';

describe('Vertex', () => {
  const vertexProps = {
    originId: 1,
    originX: 100,
    originY: 200,
    destId: 2,
    destX: 200,
    destY: 300,
  }

  it('renders correctly with given props', () => {
    render(<svg><Vertex {...vertexProps} /></svg>);
    const nodeElement = screen.getByTestId('vertex-1-2');

    const midX = vertexProps.destX;
    const midY = vertexProps.destY - CONSTANTS.treeLevelSpacing/2;

    expect(nodeElement).toBeInTheDocument();
    expect(nodeElement).toHaveAttribute('d', `M${vertexProps.originX},${vertexProps.originY} V${midY} H${midX} V${vertexProps.destY}`);
  });
});
