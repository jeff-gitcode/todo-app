'use client';

import Link from 'next/link';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

import { Todo } from '@/app/domain/entities/todo';
import { useTodos, useDeleteTodo } from '../hooks/use-todos';

const TodoList = () => {
  const { data: todos, isLoading, error } = useTodos();
  const deleteTodo = useDeleteTodo();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent>
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
                  <Link href={`/presentation/pages/todos/${todo.id}`} passHref>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTodo.mutate(todo.id)}
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