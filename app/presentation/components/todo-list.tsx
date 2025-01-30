'use client';

import { Todo } from '@/app/domain/entities/todo';
import { useTodos } from '../hooks/use-todos';

const TodoList = () => {
    const { data: todos, isLoading, error } = useTodos();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <ul>
            {(todos as Todo[])?.map((todo: Todo) => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    );
};

export default TodoList;