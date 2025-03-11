import { render, fireEvent, waitFor } from "@testing-library/react";
import NavMenu from "./nav-menu";
import { useSession, signOut } from "next-auth/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("NavMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the navigation menu correctly when not authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    const screen = render(<NavMenu />);

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("renders the navigation menu correctly when authenticated", () => {
    const session = {
      user: {
        name: "Test User",
        email: "test@example.com",
        image: "https://example.com/avatar.jpg",
      },
    };
    (useSession as jest.Mock).mockReturnValue({
      data: session,
      status: "authenticated",
    });

    const screen = render(<NavMenu />);

    expect(screen.getByText(/test user/i)).toBeInTheDocument();
    // expect(screen.getByRole('img', { name: /avatar/i })).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it("calls signOut when sign out button is clicked", async () => {
    const session = {
      user: {
        name: "Test User",
        email: "test@example.com",
        image: "https://example.com/avatar.jpg",
      },
    };
    (useSession as jest.Mock).mockReturnValue({
      data: session,
      status: "authenticated",
    });

    const screen = render(<NavMenu />);
    screen.debug();
    const signOutButton = screen.getByText(/sign out/i);
    expect(signOutButton).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(signOutButton);
      expect(signOut).toHaveBeenCalledWith({ redirect: false });
    });
  });
});
