import { useQuery } from '@tanstack/react-query';
import { Todo } from '@/app/domain/entities/todo';

const fetchTodos = async (): Promise<Todo[]> => {
    const res = await fetch('/api/todos');
    return res.json();
};

export const TodoList = () => {
    const { data, isLoading, error } = useQuery(['todos'], fetchTodos);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <ul>
            {data.map((todo) => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    );
};