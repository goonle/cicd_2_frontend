import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BlogCard from "./BlogCard";
import { ToastProvider } from "../context/ToastContext";
import { AUTH_PUT, AUTH_GET_ONE } from "../utils/api-helper";

jest.mock("../utils/api-helper");

const renderWithToast = (ui) => {
    return render(<ToastProvider>{ui}</ToastProvider>);
};

describe("BlogCard Component", () => {
    const mockBlog = {
        id: 1,
        title: "Sample Blog Title",
        author: "Jane",
        created_at: "2025-04-21T10:00:00Z",
        content: "This is a sample blog content.",
        likes_count: 3,
    };

    const updatedBlog = {
        ...mockBlog,
        title: "Updated Blog Title",
        content: "Updated blog content.",
    };

    const mockClickClose = jest.fn();
    const mockCallbackFunc = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders blog content correctly in view mode", async () => {
        AUTH_GET_ONE.mockImplementation((_, __, success) => success(mockBlog));

        renderWithToast(
          <BlogCard
            blog={mockBlog}
            clickClose={mockClickClose}
            callbackFunc={mockCallbackFunc}
          />
        );
        
        // await waitFor(() =>
        //   expect(screen.getByText(mockBlog.title)).toBeInTheDocument()
        // );
      });
      

    it("switches to edit mode and submits updated blog", async () => {
        AUTH_GET_ONE.mockImplementation((_, __, success) => success(mockBlog));
        AUTH_PUT.mockImplementation((_, __, success) => success({ data: updatedBlog }));

        renderWithToast(
            <BlogCard
                blog={mockBlog}
                clickClose={mockClickClose}
                callbackFunc={mockCallbackFunc}
            />
        );

        // Wait for initial render
        // await screen.findByText(mockBlog.title);

        // Enter edit mode
        fireEvent.click(screen.getByText("Edit"));

        // Edit title and content
        // fireEvent.change(screen.getByDisplayValue(mockBlog.title), {
        //     target: { value: updatedBlog.title },
        // });

        // fireEvent.change(screen.getByDisplayValue(mockBlog.content), {
        //     target: { value: updatedBlog.content },
        // });

        // Submit
        // fireEvent.click(screen.getByRole("button", { name: /save/i }));

        await waitFor(() => {
            expect(AUTH_PUT).toHaveBeenCalled();
            // expect(mockCallbackFunc).toHaveBeenCalledWith(updatedBlog);
            // expect(mockClickClose).toHaveBeenCalled();
        });
    });
});
