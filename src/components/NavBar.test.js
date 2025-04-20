import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';

// Mock localStorage and window.location
beforeEach(() => {
  Storage.prototype.removeItem = jest.fn();
  delete window.location;
  window.location = { href: '' };
});

test('renders logout button', () => {
  render(<NavBar />);
  const logoutButton = screen.getByText(/log out/i);
  expect(logoutButton).toBeInTheDocument();
});

test('removes token and redirects on logout click', () => {
  render(<NavBar />);
  const logoutButton = screen.getByText(/log out/i);

  fireEvent.click(logoutButton);

  expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  expect(window.location.href).toBe('/login');
});