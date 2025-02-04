'use client';

import { useTodoById } from '@/app/presentation/hooks/use-todos';
// src/presentation/pages/todos/[id]/edit.tsx
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import TodoItem from '@/app/presentation/components/todo-item';
import { Button } from '@/components/ui/button';

// create a simple react page
const EditTodoPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    const { data: todo, isLoading, isError } = useTodoById(Number(id));

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching todo</div>;

    const handleSuccess = () => {
        router.push('/'); // Redirect to the home page after successful update
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
            {todo && (
                <TodoItem
                    todo={todo}
                    onSuccess={handleSuccess}
                />
            )}
            <Button variant="outline" onClick={() => router.push('/')} className="mt-4">
                Cancel
            </Button>
        </div>
    );

};

export default EditTodoPage;

// import { useRouter } from 'next/navigation';
// import TodoItem from '@/app/presentation/components/todo-item';
// import { Button } from '@/components/ui/button';
// import { useTodoById } from '@/app/presentation/hooks/use-todos';

// export default function EditTodoPage({ params }: { params: { id: string } }) {
//     const { id } = params;
//     const todoId = Number(id);
//     console.log('todoId', todoId);
//     const router = useRouter();

//     const { data: todo, isLoading, isError } = useTodoById(todoId);

//     if (isLoading) return <div>Loading...</div>;
//     if (isError) return <div>Error fetching todo</div>;

//     const handleSuccess = () => {
//         router.push('/'); // Redirect to the home page after successful update
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
//             {todo && (
//                 <TodoItem
//                     todo={todo}
//                     onSuccess={handleSuccess}
//                 />
//             )}
//             <Button variant="outline" onClick={() => router.push('/')} className="mt-4">
//                 Cancel
//             </Button>
//         </div>
//     );
// }