// // src/components/TodoList.test.tsx
// import React from "react";
// import { render, screen } from "@testing-library/react";
// import TodoList from "./todo-list";

// describe("TodoList", () => {
//     it("renders todos correctly", () => {
//         const todos = [
//             { id: 1, title: "Test Todo 1", description: "Description 1" },
//             { id: 2, title: "Test Todo 2", description: "Description 2" },
//         ];
//         render(<TodoList todos={todos} onDelete={() => { }} />);

//         expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
//         expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
//     });
// });