// import { useAuth } from '../hooks/useAuth';
import TodoList from '../components/todo-list';
import { useSession } from 'next-auth/react';
import SignInPage from './auth/signin/page';

export default function DashBoard() {
    const session = useSession();
    console.log("************************Dashboard***********************");
    console.log(session);

    if (!session) {
        return <SignInPage />;
    }

    return (
        <div>
            <TodoList />
        </div>
    );
}