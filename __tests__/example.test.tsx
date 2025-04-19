import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

function Example() {
  return <div>Hello, Jest!</div>;
}

describe('Example component', () => {
  it('renders Hello, Jest!', () => {
    render(<Example />);
    expect(screen.getByText('Hello, Jest!')).toBeInTheDocument();
  });
});
