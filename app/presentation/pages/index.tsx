// import { useAuth } from '../hooks/useAuth';
import { useSession } from 'next-auth/react';
import TodoList from '../components/todo-list';

export default function DashBoard() {
    // const { data: session } = useSession();

    // if (!session) {
    //     return <p>You are not authenticated</p>;
    // }

    return (
        <div>
            <TodoList />
        </div>
    );
}