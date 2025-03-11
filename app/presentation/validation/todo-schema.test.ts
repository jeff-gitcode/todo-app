import { TodoSchema } from "./todo-schema";

describe("TodoSchema", () => {
  it("should validate a valid todo", () => {
    const validData = {
      title: "Test Todo",
      completed: true,
    };

    expect(() => TodoSchema.parse(validData)).not.toThrow();
  });

  it("should validate a valid todo without completed field", () => {
    const validData = {
      title: "Test Todo",
    };

    expect(() => TodoSchema.parse(validData)).not.toThrow();
  });

  it("should invalidate an invalid todo with empty title", () => {
    const invalidData = {
      title: "",
      completed: true,
    };

    expect(() => TodoSchema.parse(invalidData)).toThrow();
  });

  it("should invalidate an invalid todo with missing title", () => {
    const invalidData = {
      completed: true,
    };

    expect(() => TodoSchema.parse(invalidData)).toThrow();
  });
});
