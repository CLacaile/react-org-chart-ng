import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar from '../../src/components/Avatar';

describe('Avatar', () => {
  it('renders with default width and height', () => {
    render(<Avatar />);
    const svgElement = screen.getByRole('img');
    expect(svgElement).toHaveAttribute('width', '96');
    expect(svgElement).toHaveAttribute('height', '96');
  });

  it('renders with custom width and height', () => {
    const customWidth = 150;
    const customHeight = 150;
    render(<Avatar width={customWidth} height={customHeight} />);
    const svgElement = screen.getByRole('img');
    expect(svgElement).toHaveAttribute('width', customWidth.toString());
    expect(svgElement).toHaveAttribute('height', customHeight.toString());
  });
});
