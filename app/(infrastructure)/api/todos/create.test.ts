import { createMocks } from 'node-mocks-http';
import { POST } from './create';
import { CreateTodo } from '@/app/application/use-cases/create-todo';

jest.mock('@/app/(infrastructure)/database/prisma-todo-repository');
jest.mock('@/app/application/use-cases/create-todo');


describe('POST /api/todos/create', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('creates a new todo successfully', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: { title: 'Test Todo' },
        });

        const mockTodo = { id: 1, title: 'Test Todo', completed: false };
        (CreateTodo.prototype.execute as jest.Mock).mockResolvedValue(mockTodo);
        await POST(req, res);

        expect(res._getStatusCode()).toBe(201);
        expect(res._getJSONData()).toEqual(mockTodo);
    });

    it('returns validation errors for invalid data', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: { title: '' }, // Invalid data
        });

        await POST(req, res);

        expect(res._getStatusCode()).toBe(400);
        expect(res._getJSONData()).toHaveProperty('errors');
    });
});