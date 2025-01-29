import { z } from 'zod';

const TodoSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    completed: z.boolean().optional(),
});

export { TodoSchema };