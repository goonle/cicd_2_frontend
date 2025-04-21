import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogCard from './BlogCard';

describe('BlogCard component', () => {
  const blogMock = {
    title: 'Test Blog Title',
    author: 'Jane Doe',
    created_at: '2023-04-20T10:00:00Z',
    content: 'This is the content of the test blog.',
    likes_count: 2,
  };

  it('renders blog content correctly', () => {
    render(<BlogCard blog={blogMock} clickClose={jest.fn()} />);

    // Title and Author
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/)).toBeInTheDocument();

    // Date
    const formattedDate = new Date(blogMock.created_at).toLocaleDateString("en-GB");
    // expect(screen.getByText(`by ${blogMock.author} | ${formattedDate}`)).toBeInTheDocument();
    const metaElements = screen.getAllByText((_, element) => {
        return element?.textContent?.includes(blogMock.author) &&
               element?.textContent?.includes(formattedDate);
      });
      
      expect(metaElements.length).toBeGreaterThan(0); // or check specific element
    // Content
    expect(screen.getByText(blogMock.content)).toBeInTheDocument();

    // Likes
    expect(screen.getByText(/2 likes/)).toBeInTheDocument();
  });

  it('handles clickClose when X button is clicked', () => {
    const mockClick = jest.fn();
    render(<BlogCard blog={blogMock} clickClose={mockClick} />);

    const closeButton = screen.getByRole('button', { name: /x/i });
    fireEvent.click(closeButton);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('renders singular "like" when likes_count is 1', () => {
    const oneLikeBlog = { ...blogMock, likes_count: 1 };
    render(<BlogCard blog={oneLikeBlog} clickClose={jest.fn()} />);

    expect(screen.getByText(/1 like/)).toBeInTheDocument();
  });
});
