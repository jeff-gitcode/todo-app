import { UpdateTodo } from './update-todo';
import { ITodoRepository } from '@/app/domain/interfaces/itodo-repository';
import { Todo } from '@/app/domain/entities/todo';

// app/application/use-cases/update-todo.test.ts

describe('UpdateTodo', () => {
    let updateTodo: UpdateTodo;
    let todoRepository: jest.Mocked<ITodoRepository>;

    beforeEach(() => {
        todoRepository = {
            updateTodo: jest.fn()
        } as jest.Mocked<ITodoRepository>;
        updateTodo = new UpdateTodo(todoRepository);
    });

    it('should call updateTodo with correct parameters', async () => {
        const id = 1;
        const todoData = { title: 'Updated Todo', description: 'Updated Description' };
        const updatedTodo = { ...todoData, id, createdAt: new Date(), updatedAt: new Date() };
        todoRepository.updateTodo.mockResolvedValue(updatedTodo);

        await updateTodo.execute(id, todoData);

        expect(todoRepository.updateTodo).toHaveBeenCalledWith(id, todoData);
    });

    it('should return the updated todo', async () => {
        const id = 1;
        const todoData = { title: 'Updated Todo', description: 'Updated Description' };
        const updatedTodo = { ...todoData, id, createdAt: new Date(), updatedAt: new Date() };
        todoRepository.updateTodo.mockResolvedValue(updatedTodo);

        const result = await updateTodo.execute(id, todoData);

        expect(result).toEqual(updatedTodo);
    });
});