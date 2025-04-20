/* eslint-disable no-undef */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import Register from "./Register";
import axios from "axios";
import { ToastProvider } from "../context/ToastContext";
jest.mock("axios");

const renderWithToast = (ui) => {
  return render(
    <ToastProvider>
      {ui}
    </ToastProvider>
  );
};

describe("Register Component", () => {
  it("renders the login form", () => {
    renderWithToast(<Register />);
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("Username")).toHaveLength(1); // optional
  });

  it("submits the login form successfully", async () => {
    // Mock axios response
    axios.post.mockResolvedValue({ data: { message: "Login successful" } });

    renderWithToast(<Register activeTab="login" />);

    // Find the login form
    const loginLabel = screen.getByText("Login", { selector: "label" });
    expect(loginLabel).toBeVisible();

    const loginForm = loginLabel.closest("form");

    // Find inputs and button
    const usernameInput = within(loginForm).getByPlaceholderText("Username");
    const passwordInput = within(loginForm).getByPlaceholderText("Password");
    const submitButton = within(loginForm).getByRole("button", {
      name: /login/i,
    });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("login/"),
        { username: "testuser", password: "password123" }
      );
    });
  });

  it("shows error message on login failure", async () => {
    axios.post.mockRejectedValue(new Error("Login failed"));

    renderWithToast(<Register activeTab="login" />);

    const loginLabel = screen.getByText("Login", { selector: "label" });
    expect(loginLabel).toBeVisible();

    const loginForm = loginLabel.closest("form");

    // Get username, password input fields, and submit button
    const usernameInput = within(loginForm).getByPlaceholderText("Username");
    const passwordInput = within(loginForm).getByPlaceholderText("Password");
    const submitButton = within(loginForm).getByRole("button", {
      name: /login/i,
    });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Wait for the axios call to complete and check if it was called with the correct parameters
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("login/"),
        { username: "testuser", password: "password123" }
      );
    });

    // Check that the error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
    });
  });
});
