import { signUpSchema, signInSchema } from "./auth-schema";

describe("Auth Schemas", () => {
  describe("signUpSchema", () => {
    it("should validate a valid sign-up form", () => {
      const validData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        passwordConfirmation: "password123",
      };

      expect(() => signUpSchema.parse(validData)).not.toThrow();
    });

    it("should invalidate an invalid sign-up form", () => {
      const invalidData = {
        name: "",
        email: "invalid-email",
        password: "123",
        passwordConfirmation: "123",
      };

      expect(() => signUpSchema.parse(invalidData)).toThrow();
    });

    it("should invalidate when password and passwordConfirmation do not match", () => {
      const invalidData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        passwordConfirmation: "differentpassword",
      };

      expect(() => signUpSchema.parse(invalidData)).toThrow();
    });
  });

  describe("signInSchema", () => {
    it("should validate a valid sign-in form", () => {
      const validData = {
        email: "test@example.com",
        password: "password123",
      };

      expect(() => signInSchema.parse(validData)).not.toThrow();
    });

    it("should invalidate an invalid sign-in form", () => {
      const invalidData = {
        email: "invalid-email",
        password: "",
      };

      expect(() => signInSchema.parse(invalidData)).toThrow();
    });
  });
});
