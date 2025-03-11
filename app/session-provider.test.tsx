import { render, screen } from "@testing-library/react";
import { SessionProvider } from "./session-provider";

jest.mock("next-auth/react", () => ({
  SessionProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

describe("SessionProvider", () => {
  it("renders the SessionProvider component with children", () => {
    render(
      <SessionProvider>
        <div>Test Child</div>
      </SessionProvider>,
    );

    expect(screen.getByText(/test child/i)).toBeInTheDocument();
  });
});
