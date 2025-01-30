'use client';

import { Todo } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const fetchTodos = async (): Promise<Todo[]> => {
    const res = await fetch('infrastructure/api/todos');
    return res.json();
};

export const useTodos = () => {
    return useQuery(
        {
            queryKey: ['todos'],
            queryFn: fetchTodos
        });
};


// export const useCreateTodo = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (data: { title: string; description: string; userId: string }) =>
//             createTodo(data.title, data.description, data.userId),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["todos"] });
//         },
//     });
// };

// export const useUpdateTodo = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (data: {
//             id: number;
//             title: string;
//             description: string;
//             completed: boolean;
//         }) => updateTodo(data.id, data.title, data.description, data.completed),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["todos"] });
//         },
//     });
// };

// export const useDeleteTodo = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (id: number) => deleteTodo(id),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["todos"] });
//         },
//     });
// };