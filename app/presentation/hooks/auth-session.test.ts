import { useCurrentSession } from "./auth-session";
import { auth } from "@/auth";

jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

describe("useCurrentSession", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the current session", async () => {
    const mockSession = {
      user: { name: "Test User", email: "test@example.com" },
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);

    const session = await useCurrentSession();

    expect(auth).toHaveBeenCalled();
    expect(session).toEqual(mockSession);
  });

  it("handles errors when fetching the session", async () => {
    (auth as jest.Mock).mockRejectedValue(new Error("Failed to fetch session"));

    await expect(useCurrentSession()).rejects.toThrow(
      "Failed to fetch session",
    );
  });
});
