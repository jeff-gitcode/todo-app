import { Todo } from "@/app/domain/entities/todo";
import { ITodoRepository } from "@/app/domain/interfaces/itodo-repository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaTodoRepository implements ITodoRepository {
  async createTodo(
    todo: Omit<Todo, "id" | "createdAt" | "updatedAt">,
  ): Promise<Todo> {
    return prisma.todo.create({ data: todo });
  }

  async getTodos(): Promise<Todo[]> {
    return prisma.todo.findMany();
  }

  async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo> {
    return prisma.todo.update({ where: { id }, data: todo });
  }

  async deleteTodo(id: number): Promise<void> {
    await prisma.todo.delete({ where: { id } });
  }
}
