import { useQuery } from '@tanstack/react-query';

const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    return res.json();
};

export const useTodos = () => {
    return useQuery(['todos'], fetchTodos);
};