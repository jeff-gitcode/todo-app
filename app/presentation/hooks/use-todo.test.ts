import { renderHook, waitFor } from '@testing-library/react';
import { useTodos } from '@/app/presentation/hooks/use-todos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('useTodos', () => {
    it('fetches todos', async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client= { queryClient } > { children } </QueryClientProvider>
    );

    const { result } = renderHook(() => useTodos(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
});
});