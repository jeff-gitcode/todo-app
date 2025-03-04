import httpMocks from 'node-mocks-http';
import { GET, POST } from './route';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        todo: {
            findMany: jest.fn(),
            create: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe('GET /api/todos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('retrieves all todos successfully', async () => {
        const mockTodos = [
            { id: 1, title: 'Test Todo 1', completed: false },
            { id: 2, title: 'Test Todo 2', completed: true },
        ];
        (prisma.todo.findMany as jest.Mock).mockResolvedValue(mockTodos);

        httpMocks.createRequest({
            method: 'GET',
            url: '/api/todos',

        });
        const res = httpMocks.createResponse();

        await GET();

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockTodos);
    });

    it('returns an error if retrieving todos fails', async () => {
        (prisma.todo.findMany as jest.Mock).mockRejectedValue(new Error('Retrieval failed'));

        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/todos',
        });
        const res = httpMocks.createResponse();

        await GET();

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toHaveProperty('error', 'Retrieval failed');
    });
});

describe('POST /api/todos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('creates a new todo successfully', async () => {
        const payload = { title: 'New Todo', completed: false };
        const mockTodo = { id: 1, ...payload };
        (prisma.todo.create as jest.Mock).mockResolvedValue(mockTodo);

        const req = httpMocks.createRequest({
            method: 'POST',
            body: payload,
        });
        const res = httpMocks.createResponse();

        await POST(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual(mockTodo);
    });

    it('returns an error if creating a todo fails', async () => {
        (prisma.todo.create as jest.Mock).mockRejectedValue(new Error('Creation failed'));

        const payload = { title: 'New Todo', completed: false };
        const req = httpMocks.createRequest({
            method: 'POST',
            body: payload,
        });
        const res = httpMocks.createResponse();

        await POST(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toHaveProperty('error', 'Creation failed');
    });
});
