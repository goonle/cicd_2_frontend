import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastMessage from './ToastMessage';

// Mock CSS Modules
jest.mock('./ToastMessage.module.css', () => ({
  toastMessage: 'toastMessage',
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
}));

describe('ToastMessage Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders with default props', () => {
    render(<ToastMessage />);
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent('toast Message');
    expect(toast).toHaveClass('toastMessage', 'info');
  });

  test('renders with custom message and type', () => {
    render(<ToastMessage message="Success!" type="success" show={true} />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveTextContent('Success!');
    expect(toast).toHaveClass('success');
  });

  test('toast hides after 3 seconds (via parent)', () => {
    const { rerender } = render(
      <ToastMessage message="Bye!" type="warning" show={true} />
    );
    const toast = screen.getByRole('alert');
    expect(toast).toBeVisible();
  
    // Fast-forward 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });
  
    // Re-render with show=false (as your real app does)
    rerender(
      <ToastMessage message="Bye!" type="warning" show={false} />
    );
  
    expect(toast).toHaveClass('hidden');
  });
  
});
