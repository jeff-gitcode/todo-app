// // src/hooks/useTodos.test.ts
// import { renderHook, waitFor } from "@testing-library/react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import useTodos from "./use-Todos";

// const queryClient = new QueryClient();

// const wrapper = ({ children }: { children: React.ReactNode }) => (
//     <QueryClientProvider client={queryClient} >
//         {children}
//     </QueryClientProvider>
// );

// describe("useTodos", () => {
//     it("fetches todos", async () => {
//         const { result } = renderHook(() => useTodos("user-id"), { wrapper });

//         await waitFor(() => expect(result.current.isSuccess).toBe(true));
//         expect(result.current.data).toEqual([
//             { id: 1, title: "Test Todo", completed: false },
//         ]);
//     });
// });