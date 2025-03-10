'use client';

import { Todo } from '@prisma/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoFormData } from '../validation/todo-schema';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const API_BASE_URL = `${API_URL}/api/todos`;

// Fetch all todos
const fetchTodos = async (): Promise<Todo[]> => {
  console.log('fetchTodos', API_BASE_URL);
  const res = await fetch(`${API_BASE_URL}`);
  return await res.json();
};

// Fetch a single todo by ID
const fetchTodoById = async (id: number): Promise<Todo> => {
  console.log('fetchTodoById', API_BASE_URL);
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch todo');
  return await res.json();
};

export const useTodos = () => {
  return useQuery(
    {
      queryKey: ['todos'],
      queryFn: fetchTodos
    });
};

// Fetch a single todo by ID
export const useTodoById = (id: number) => {

  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodoById(id),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['todos'] });

    // },
  });
}



// Create a new todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: TodoFormData) => {
      const response = await fetch(`${API_BASE_URL}`, {
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
    onError: (error) => {
      console.error('Error creating todo:', error);
    },
  });
};

// Update an existing todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: { id: number } & TodoFormData) => {
      const response = await fetch(`${API_BASE_URL}/${todo.id}`, {
        method: 'PATCH',
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
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // Invalidate the cache
    },
  });
};

