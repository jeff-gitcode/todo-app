import { TodoRepository } from '@/app/domain/repositories/itodo-repository';
import { Todo } from '@/app/domain/entities/todo';

export class UpdateTodo {
    constructor(private todoRepository: TodoRepository) { }

    async execute(id: number, todo: Partial<Todo>): Promise<Todo> {
        return this.todoRepository.updateTodo(id, todo);
    }
}