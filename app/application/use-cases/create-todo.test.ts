import { CreateTodo } from './create-todo';
import { ITodoRepository } from '@/app/domain/interfaces/itodo-repository';
import { Todo } from '@/app/domain/entities/todo';

// app/application/use-cases/create-todo.test.ts

describe('CreateTodo', () => {
    let createTodo: CreateTodo;
    let todoRepository: jest.Mocked<ITodoRepository>;

    beforeEach(() => {
        todoRepository = {
            createTodo: jest.fn()
        } as jest.Mocked<ITodoRepository>;
        createTodo = new CreateTodo(todoRepository);
    });

    it('should call createTodo with correct parameters', async () => {
        const todoData = { title: 'Test Todo', description: 'Test Description' };
        const createdTodo = { ...todoData, id: '1', createdAt: new Date(), updatedAt: new Date() };
        todoRepository.createTodo.mockResolvedValue(createdTodo);

        await createTodo.execute(todoData);

        expect(todoRepository.createTodo).toHaveBeenCalledWith(todoData);
    });

    it('should return the created todo', async () => {
        const todoData = { title: 'Test Todo', description: 'Test Description' };
        const createdTodo = { ...todoData, id: '1', createdAt: new Date(), updatedAt: new Date() };
        todoRepository.createTodo.mockResolvedValue(createdTodo);

        const result = await createTodo.execute(todoData);

        expect(result).toEqual(createdTodo);
    });
});