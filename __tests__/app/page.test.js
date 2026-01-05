import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../app/page';

// Mock the Header component
jest.mock('../../components/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Mock Header</header>;
  };
});

describe('Homepage', () => {
  test('renders main heading', () => {
    render(<Home />);
    
    const mainHeading = screen.getByRole('heading', { level: 1, name: 'nulad.github.io' });
    expect(mainHeading).toBeInTheDocument();
  });

  test('renders blog coming soon message', () => {
    render(<Home />);
    
    expect(screen.getByText('Blog coming soon...')).toBeInTheDocument();
  });

  test('renders within main element', () => {
    const { container } = render(<Home />);
    
    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('has correct document structure', () => {
    const { container } = render(<Home />);
    
    // Check that the main heading is an h1
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent('nulad.github.io');
    
    // Check that there's a paragraph element
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('Blog coming soon...');
  });
});
