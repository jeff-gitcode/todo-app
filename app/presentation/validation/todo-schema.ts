import { z } from 'zod';

export const TodoSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    completed: z.boolean().optional(),
});

export type TodoFormData = z.infer<typeof TodoSchema>;