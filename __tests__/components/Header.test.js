import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/Header';

jest.mock('next/link', () => {
  return ({ href, children, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

describe('Header', () => {
  test('renders site title "nulad"', () => {
    render(<Header />);
    expect(screen.getByText('nulad')).toBeInTheDocument();
  });

  test('title links to homepage "/"', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: 'nulad' });
    expect(link).toHaveAttribute('href', '/');
  });

  test('applies brutalist styling classes', () => {
    render(<Header />);
    const header = screen.getByText('nulad').closest('header');
    expect(header).toHaveClass('border-b-4');
    expect(header).toHaveClass('border-black');
  });
});
