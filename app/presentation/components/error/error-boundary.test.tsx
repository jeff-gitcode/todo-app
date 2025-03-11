import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Correct import for jest-dom
import ErrorBoundary from "./error-boundary";

const ErrorComponent = () => {
  throw new Error("This is a test error");
};

describe("ErrorBoundary", () => {
  test("renders fallback UI when an error is thrown", () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Oops, there is an error!")).toBeInTheDocument();
    expect(screen.getByText("This is a test error")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reload/i })).toBeInTheDocument();
  });

  test("renders children when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });
});
