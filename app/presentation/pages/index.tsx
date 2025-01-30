// import { useAuth } from '../hooks/useAuth';
import TodoList from '../components/todo-list';

export default function DashBoard() {
    // const { user } = useAuth();

    // if (!user) return <div>Please log in to view todos.</div>;

    return (
        <div>
            <h1>Todo List</h1>
            <TodoList />
        </div>
    );
}