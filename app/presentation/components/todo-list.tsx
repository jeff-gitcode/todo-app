"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

import { Todo } from "@/app/domain/entities/todo";
import { useTodos, useDeleteTodo } from "../hooks/use-todos";
import { useRouter } from "next/navigation";

const TodoList = () => {
  const router = useRouter();
  const { data: todos, isLoading, error } = useTodos();
  const { mutate: deleteTodo } = useDeleteTodo();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSuccess = () => {
    router.push("/"); // Redirect to the home page after successful update
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={`/presentation/pages/protected/todos/0`} passHref>
          <Button variant="outline">New</Button>
        </Link>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(todos as Todo[]).map((todo: Todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.title}</TableCell>
                <TableCell>
                  <Link
                    href={`/presentation/pages/protected/todos/${todo.id}`}
                    passHref
                  >
                    <Button variant="ghost" size="sm">
                      Edit
                      {/* <Pencil className="h-4 w-4" /> */}
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      deleteTodo(todo.id, { onSuccess: handleSuccess })
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TodoList;
