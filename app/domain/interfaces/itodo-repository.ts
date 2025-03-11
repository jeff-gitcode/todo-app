import { Todo } from "../entities/todo";

export interface ITodoRepository {
  createTodo(todo: Omit<Todo, "id" | "createdAt" | "updatedAt">): Promise<Todo>;
  getTodos(): Promise<Todo[]>;
  updateTodo(id: number, todo: Partial<Todo>): Promise<Todo>;
  deleteTodo(id: number): Promise<void>;
}
