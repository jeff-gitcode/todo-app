// // import { useAuth } from '../hooks/useAuth';
// import { useSession } from 'next-auth/react';

// import SignInPage from './auth/signin/page';
// import TodoList from '../components/todo-list';

// export default function DashBoard() {
//     const session = useSession();
//     console.log("************************Dashboard***********************");
//     console.log(session.status);
//     console.log(session.data);

//     if (session.status !== "authenticated") {
//         return <SignInPage />;
//     }

//     return (
//         <div>
//             <TodoList />
//         </div>
//     );
// }
