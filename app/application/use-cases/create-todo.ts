import { TodoRepository } from '@/app/domain/repositories/itodo-repository';
import { Todo } from '@/app/domain/entities/todo';

export class CreateTodo {
    constructor(private todoRepository: TodoRepository) { }

    async execute(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> {
        return this.todoRepository.createTodo(todo);
    }
}