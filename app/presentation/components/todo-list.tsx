import exp from 'constants';
import { useTodos } from '../hooks/use-todos';

const TodoList = () => {
    const { data, isLoading, error } = useTodos();

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

export default TodoList;