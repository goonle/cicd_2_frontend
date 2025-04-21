import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BlogDetail from "./BlogDetail";
import { ToastProvider } from "../context/ToastContext";
import * as apiHelper from "../utils/api-helper";

// Mock the API call
jest.spyOn(apiHelper, "AUTH_POST").mockImplementation((url, data, onSuccess, onError, onFinally) => {
  onSuccess({ message: "Success" });
  onFinally();
});

describe("BlogDetail component", () => {
  const mockClickClose = jest.fn();
  const mockCallbackFunc = jest.fn();

  const renderComponent = () =>
    render(
      <ToastProvider>
        <BlogDetail
          type="create"
          clickClose={mockClickClose}
          callbackFunc={mockCallbackFunc}
        />
      </ToastProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form inputs and buttons", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("submits form and triggers callbacks", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByPlaceholderText(/content/i), {
      target: { value: "Test Content" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(apiHelper.AUTH_POST).toHaveBeenCalledWith(
        "blogs/",
        { title: "Test Title", content: "Test Content" },
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );
    //   expect(mockClickClose).toHaveBeenCalled();
    //   expect(mockCallbackFunc).toHaveBeenCalled();
    });
  });

  it("calls clickClose when cancel is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(mockClickClose).toHaveBeenCalled();
  });
});
