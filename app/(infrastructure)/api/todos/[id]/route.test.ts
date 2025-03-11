import { PrismaClient } from "@prisma/client";
import { DELETE, GET, PATCH, PUT } from "./route";
import { NextResponse } from "next/server";
import { createMocks } from "node-mocks-http";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
  Request: jest.fn().mockImplementation(() => ({
    json: jest.fn(),
  })),
}));

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    todo: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe("GET /api/todos/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a todo item when found", async () => {
    const mockTodo = { id: 1, title: "Test Todo", completed: false };
    (prisma.todo.findUnique as jest.Mock).mockResolvedValue(mockTodo);

    const { req } = createMocks({ method: "GET" });
    const params = { id: "1" };

    const response = await GET(req, { params });

    expect(prisma.todo.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(response).toEqual(NextResponse.json(mockTodo));
  });

  it("should return a 500 error when an exception occurs", async () => {
    const errorMessage = "Database error";
    (prisma.todo.findUnique as jest.Mock).mockRejectedValue(
      new Error(errorMessage),
    );

    const { req } = createMocks({ method: "GET" });
    const params = { id: "1" };

    const response = await GET(req, { params });

    expect(prisma.todo.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(response).toEqual(
      NextResponse.json({ error: errorMessage }, { status: 500 }),
    );
  });
});

describe("PUT /api/todos/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update a todo item successfully", async () => {
    const mockTodo = { id: 1, title: "Test Todo", completed: false };
    (prisma.todo.update as jest.Mock).mockResolvedValue(mockTodo);

    const { req } = createMocks({
      method: "PUT",
      body: { title: "Updated Todo", completed: true },
    });
    const params = { id: "1" };

    const response = await PUT(req, { params, body: req.body });

    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: "Updated Todo", completed: true },
    });
    expect(response).toEqual(NextResponse.json(mockTodo));
  });

  it("should return a 500 error when an exception occurs", async () => {
    const errorMessage = "Database error";
    (prisma.todo.update as jest.Mock).mockRejectedValue(
      new Error(errorMessage),
    );

    const { req } = createMocks({
      method: "PUT",
      body: { title: "Updated Todo", completed: true },
    });
    const params = { id: "1" };

    const response = await PUT(req, { params, body: req.body });

    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: "Updated Todo", completed: true },
    });
    expect(response).toEqual(
      NextResponse.json({ error: errorMessage }, { status: 500 }),
    );
  });
});

describe("DELETE /api/todos/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a todo item successfully", async () => {
    const { req } = createMocks({ method: "DELETE" });
    const params = { id: "1" };

    const responnse = await DELETE(req, { params });

    expect(prisma.todo.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(responnse).toEqual(NextResponse.json(null, { status: 204 }));
  });

  it("should return a 500 error when an exception occurs", async () => {
    const errorMessage = "Database error";
    (prisma.todo.delete as jest.Mock).mockRejectedValue(
      new Error(errorMessage),
    );

    const { req } = createMocks({ method: "DELETE" });
    const params = { id: "1" };

    const response = await DELETE(req, { params });

    expect(prisma.todo.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(response).toEqual(
      NextResponse.json({ error: errorMessage }, { status: 500 }),
    );
  });
});

describe("PATCH /api/todos/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update a todo item successfully", async () => {
    const mockTodo = { id: 1, title: "Test Todo", completed: false };
    (prisma.todo.update as jest.Mock).mockResolvedValue(mockTodo);

    const { req } = createMocks({
      method: "PATCH",
      body: { title: "Updated Todo", completed: true },
    });
    const params = { id: "1" };
    req.json = jest.fn().mockResolvedValue(req.body);

    const response = await PATCH(req, { params });

    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: "Updated Todo", completed: true },
    });
    expect(response).toEqual(NextResponse.json(mockTodo));
  });

  it("should return a 500 error when an exception occurs", async () => {
    const errorMessage = "Database error";
    (prisma.todo.update as jest.Mock).mockRejectedValue(
      new Error(errorMessage),
    );

    const { req } = createMocks({
      method: "PATCH",
      body: { title: "Updated Todo", completed: true },
    });
    const params = { id: "1" };
    req.json = jest.fn().mockResolvedValue(req.body);

    const response = await PATCH(req, { params });

    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: "Updated Todo", completed: true },
    });
    expect(response).toEqual(
      NextResponse.json({ error: errorMessage }, { status: 500 }),
    );
  });
});
