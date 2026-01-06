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

  test('renders blog posts', () => {
    const { container } = render(<Home />);

    // Check that post cards are rendered
    const articles = container.querySelectorAll('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  test('renders within main element', () => {
    const { container } = render(<Home />);

    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('renders posts with correct structure', () => {
    const { container } = render(<Home />);

    // Check that the main heading is an h1
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent('nulad.github.io');

    // Check that blog posts are rendered
    const articles = container.querySelectorAll('article');
    expect(articles.length).toBeGreaterThan(0);

    // Check that each post has the expected structure
    const firstArticle = articles[0];
    expect(firstArticle.querySelector('h2')).toBeInTheDocument();
    expect(firstArticle.querySelector('time')).toBeInTheDocument();
    expect(firstArticle.querySelector('p')).toBeInTheDocument();
  });

  test('renders InfiniteScroll component', () => {
    const { container } = render(<Home />);

    // Check for infinite scroll sentinel or end marker
    const sentinel = container.querySelector('[aria-label="infinite-scroll-sentinel"]');
    const endMarker = container.querySelector('[aria-label="infinite-scroll-end"]');

    expect(sentinel || endMarker).toBeInTheDocument();
  });
});
