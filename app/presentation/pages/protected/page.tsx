'use client';

import React from 'react';

import TodoList from '../../components/todo-list'
import { useSession } from 'next-auth/react';

const ProtectedPage = () => {
    const { data: session, status } = useSession();
    console.log("************************ProtectedPage***********************");
    console.log(session);

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    return (
        <>
            <h1>Protected Page</h1>
            <TodoList />
        </>)
}

export default ProtectedPage