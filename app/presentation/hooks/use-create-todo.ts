// src/hooks/useCreateTodo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (todo: { title: string; description: string }) => {
            const response = await fetch("/api/todos/create", {
                method: "POST",
                body: JSON.stringify(todo),
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });
}