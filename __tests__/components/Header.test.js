import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/Header';

describe('Header component', () => {
  it('should render the header element', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should render the title', () => {
    render(<Header />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });

  it('should render the correct title text', () => {
    render(<Header />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('nulad.dev');
  });

  it('should render a link around the title', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: 'nulad.dev' });
    expect(link).toBeInTheDocument();
  });

  it('should link to the home page', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: 'nulad.dev' });
    expect(link).toHaveAttribute('href', '/');
  });

  it('should apply brutalist styling classes', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');
  });

  it('should have a border bottom', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('border-bottom: 4px solid black');
  });

  it('should have proper padding', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('padding: 1rem 2rem');
  });

  it('should render navigation links', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('should render a blog link', () => {
    render(<Header />);
    const blogLink = screen.getByRole('link', { name: 'Blog' });
    expect(blogLink).toBeInTheDocument();
    expect(blogLink).toHaveAttribute('href', '/blog');
  });

  it('should render an about link', () => {
    render(<Header />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
