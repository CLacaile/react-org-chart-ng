import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Node from '../../src/components/Node';
import * as CONSTANTS from '../../src/utils/constants';

describe('Node', () => {
  const nodeProps = {
    id: 1,
    x: 100,
    y: 200,
    text: 'Test Node',
    onClick: jest.fn(),
  };

  it('renders correctly with given props', () => {
    render(<svg><Node {...nodeProps} /></svg>);
    const nodeElement = screen.getByTestId('node-1');

    expect(nodeElement).toBeInTheDocument();
    expect(nodeElement).toHaveAttribute('transform', `translate(${nodeProps.x - CONSTANTS.nodeWidth / 2}, ${nodeProps.y})`);
    expect(screen.getByText(nodeProps.text)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<svg><Node {...nodeProps} /></svg>);
    const nodeElement = screen.getByTestId('node-1');
    fireEvent.click(nodeElement);
    expect(nodeProps.onClick).toHaveBeenCalled();
  });
});
