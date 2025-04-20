import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for matchers like toBeInTheDocument
import Loader from './Loader';

jest.mock('./Loader.module.css', () => ({
  loader: 'loader',
  hidden: 'hidden',
  circle: 'circle',
}));

describe('Loader Component', () => {
  test('renders loader when show is true', () => {
    render(<Loader show={true} />);
    const loaderElement = screen.getByRole('status');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('loader');
  });

  test('does not render loader when show is false', () => {
    render(<Loader show={false} />);
    const loaderElement = screen.queryByRole('status');
    expect(loaderElement).toBeNull();
  });
});