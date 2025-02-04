// src/presentation/components/TodoForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form' // shadcn/ui Form
import { Input } from '@/components/ui/input'; // shadcn/ui Input
import { Button } from '@/components/ui/button'; // shadcn/ui Button
import { useCreateTodo, useUpdateTodo } from '@/app/presentation/hooks/use-todos';
import { TodoFormData, TodoSchema } from '../validation/todo-schema';

interface TodoItemProps {
    todo?: { id: number; title: string }; // Optional todo for editing
    onSuccess?: () => void; // Callback after successful submission
}

const TodoItem = ({ todo, onSuccess }: TodoItemProps) => {
    const form = useForm({
        resolver: zodResolver(TodoSchema),
        defaultValues: {
            title: todo?.title || '', // Pre-fill title if editing
        },
        values: todo,
    });

    const { mutate: createTodo } = useCreateTodo();
    const { mutate: updateTodo } = useUpdateTodo();

    const onSubmit = (data: TodoFormData) => {
        if (todo) {
            // Update existing todo
            updateTodo({ id: todo.id, ...data }, { onSuccess });
        } else {
            // Create new todo
            createTodo(data, { onSuccess });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a todo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    {todo ? 'Update Todo' : 'Create Todo'}
                </Button>
            </form>
        </Form>
    );
};

export default TodoItem;