import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BlogMain from './BlogMain';
import { AUTH_GET } from '../utils/api-helper';
import { useToast } from '../context/ToastContext';

// Mock child components
jest.mock('../components/NavBar', () => () => <div data-testid="navbar">NavBar</div>);
jest.mock('../components/Loader', () => ({ show }) => show ? <div>Loading...</div> : null);
jest.mock('../components/BlogCard', () => ({ blog, clickClose }) => <div data-testid="blog-card">{blog.title}</div>);
jest.mock('../components/BlogDetail', () => () => <div data-testid="blog-detail">Blog Detail</div>);
jest.mock('../components/BlogListItem', () => ({ blog, onClick }) => (
  <tr data-testid="blog-item" onClick={onClick}>
    <td>{blog.title}</td><td>{blog.author}</td><td>{blog.date}</td><td>{blog.likes_count}</td>
  </tr>
));

// Mock API and toast
jest.mock('../utils/api-helper', () => ({
  AUTH_GET: jest.fn()
}));

jest.mock('../context/ToastContext', () => ({
  useToast: () => ({ handleToast: jest.fn() })
}));

const mockBlogs = [
  {
    id: 1,
    title: "First Blog",
    content: "Hello world",
    author: "John",
    likes_count: 5
  },
  {
    id: 2,
    title: "Second Blog",
    content: "Test content",
    author: "Jane",
    likes_count: 3
  }
];

describe('BlogMain', () => {
  it('fetches and displays blogs', async () => {
    AUTH_GET.mockImplementation((url, suc, fail, finallyFunc) => {
      suc({ data: mockBlogs });
      finallyFunc();
    });

    render(<BlogMain />);

    // Loader appears first
    // expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // Wait for blogs to appear
    await waitFor(() => {
      expect(screen.getAllByTestId('blog-item').length).toBe(2);
    });

    // Check blog titles
    expect(screen.getByText(/First Blog/i)).toBeInTheDocument();
    expect(screen.getByText(/Second Blog/i)).toBeInTheDocument();
  });

  it('shows blog detail on Post click', async () => {
    AUTH_GET.mockImplementation((url, suc, fail, finallyFunc) => {
      suc({ data: mockBlogs });
      finallyFunc();
    });

    render(<BlogMain />);
    
    await waitFor(() => screen.getByText(/Post/i));

    fireEvent.click(screen.getByText(/Post/i));

    expect(screen.getByTestId('blog-detail')).toBeInTheDocument();
  });

  it('shows blog card when row is clicked', async () => {
    AUTH_GET.mockImplementation((url, suc, fail, finallyFunc) => {
      suc({ data: mockBlogs });
      finallyFunc();
    });

    render(<BlogMain />);
    
    await waitFor(() => screen.getAllByTestId('blog-item'));

    fireEvent.click(screen.getAllByTestId('blog-item')[0]);

    expect(screen.getByTestId('blog-card')).toHaveTextContent('First Blog');
  });
});
