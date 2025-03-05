import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GET, POST } from './route';
import { createMocks } from 'node-mocks-http';
import { CreateTodo } from '@/app/application/use-cases/create-todo';

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        todo: {
            findMany: jest.fn(),
            create: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
    Request: jest.fn().mockImplementation(() => ({
        json: jest.fn(),
    })),
}));

jest.mock('@/app/application/use-cases/create-todo');

const prisma = new PrismaClient();

describe('GET /api/todos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a list of todos', async () => {
        const mockTodos = [
            { id: 1, title: 'Test Todo 1', completed: false },
            { id: 2, title: 'Test Todo 2', completed: true },
        ];
        (prisma.todo.findMany as jest.Mock).mockResolvedValue(mockTodos);
        (NextResponse.json as jest.Mock).mockReturnValue(mockTodos);

        const { req, res } = createMocks({ method: 'GET' });

        const response = await GET(req);

        expect(prisma.todo.findMany).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
    });

    it('should return a 500 error when an exception occurs', async () => {
        const errorMessage = 'Database error';
        (prisma.todo.findMany as jest.Mock).mockRejectedValue(new Error(errorMessage));
        (NextResponse.json as jest.Mock).mockReturnValue({ error: errorMessage });

        const { req, res } = createMocks({ method: 'GET' });

        const response = await GET(req);

        expect(prisma.todo.findMany).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith({ error: errorMessage }, { status: 500 });
    });
});

describe('POST /api/todos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new todo', async () => {
        const mockTodo = { id: 1, title: 'New Todo', completed: false };
        const mockRequestPayload = { title: 'New Todo', completed: false };
        (prisma.todo.create as jest.Mock).mockResolvedValue(mockTodo);
        (CreateTodo.prototype.execute as jest.Mock).mockResolvedValue(mockTodo);
        (NextResponse.json as jest.Mock).mockReturnValue(mockTodo);

        const { req, res } = createMocks({ method: 'POST' });
        req.json = jest.fn().mockResolvedValue(mockRequestPayload);

        const response = await POST(req);

        expect(req.json).toHaveBeenCalled();
        expect(CreateTodo.prototype.execute).toHaveBeenCalledWith(mockRequestPayload);

        expect(response).toEqual(NextResponse.json(mockTodo));
    });

    it('should return a 400 error for invalid payload', async () => {
        const mockRequestPayload = { title: '', completed: false };
        const validationError = { errors: [{ message: 'Title is required' }] };
        (NextResponse.json as jest.Mock).mockReturnValue({ errors: validationError });

        const { req, res } = createMocks({ method: 'POST' });
        req.json = jest.fn().mockResolvedValue(mockRequestPayload);

        const response = await POST(req);

        expect(req.json).toHaveBeenCalled();
        expect(response).toEqual(NextResponse.json({ errors: validationError }, { status: 400 }));
    });
});