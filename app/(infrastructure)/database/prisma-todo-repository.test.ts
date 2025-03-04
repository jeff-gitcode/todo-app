
import { PrismaClient } from '@prisma/client';
import { PrismaTodoRepository } from './prisma-todo-repository';
import { Todo } from '@/app/domain/entities/todo';

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        todo: {
            update: jest.fn(),
            delete: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();
const repository = new PrismaTodoRepository();

describe('PrismaTodoRepository', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('updates a todo', async () => {
        const todoData = { title: 'Updated Todo', completed: true };
        const mockTodo = { id: 1, ...todoData, createdAt: new Date(), updatedAt: new Date() };
        (prisma.todo.update as jest.Mock).mockResolvedValue(mockTodo);

        const result = await repository.updateTodo(1, todoData);

        expect(prisma.todo.update).toHaveBeenCalledWith({ where: { id: 1 }, data: todoData });
        expect(result).toEqual(mockTodo);
    });

    it('deletes a todo', async () => {
        (prisma.todo.delete as jest.Mock).mockResolvedValue({});

        await repository.deleteTodo(1);

        expect(prisma.todo.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
});