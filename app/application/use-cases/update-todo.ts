import { ITodoRepository } from "@/app/domain/interfaces/itodo-repository";
import { Todo } from "@/app/domain/entities/todo";

export class UpdateTodo {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(id: number, todo: Partial<Todo>): Promise<Todo> {
    return this.todoRepository.updateTodo(id, todo);
  }
}
