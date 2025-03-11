import { ITodoRepository } from "@/app/domain/interfaces/itodo-repository";
import { Todo } from "@/app/domain/entities/todo";

export class CreateTodo {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(
    todo: Omit<Todo, "id" | "createdAt" | "updatedAt">,
  ): Promise<Todo> {
    return this.todoRepository.createTodo(todo);
  }
}
