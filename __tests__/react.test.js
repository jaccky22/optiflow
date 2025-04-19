import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Simple React component
function SimpleComponent() {
  return <div>Hello from React</div>;
}

describe('React Component Test', () => {
  it('renders the component correctly', () => {
    render(<SimpleComponent />);
    expect(screen.getByText('Hello from React')).toBeInTheDocument();
  });
});
