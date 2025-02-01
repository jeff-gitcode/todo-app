'use client';

import { Todo } from '@prisma/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'infrastructure/api/todos';

const fetchTodos = async (): Promise<Todo[]> => {
    const res = await fetch(API_BASE_URL);
    return res.json();
};

export const useTodos = () => {
    return useQuery(
        {
            queryKey: ['todos'],
            queryFn: fetchTodos
        });
};

// Fetch a single todo by ID
export const useTodoById = (id: number) =>
    useQuery({
      queryKey: ['todo', id],
      queryFn: async () => {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch todo');
        return response.json();
      },
    });


// Create a new todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: Omit<Todo, 'id'>) => {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });
      if (!response.ok) throw new Error('Failed to create todo');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// Update an existing todo
export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (todo: Todo) => {
        const response = await fetch(`${API_BASE_URL}/${todo.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo),
        });
        if (!response.ok) throw new Error('Failed to update todo');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      },
    });
  };

// Delete a todo
export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete todo');
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      },
    });
  };