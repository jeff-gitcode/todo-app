import { render, screen } from "@testing-library/react";
import App from "./page";

jest.mock("./presentation/pages/protected/page", () =>
  jest.fn(() => <div>ProtectedPage Component</div>),
);

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the ProtectedPage component", () => {
    render(<App />);

    expect(screen.getByText(/protectedpage component/i)).toBeInTheDocument();
  });
});
