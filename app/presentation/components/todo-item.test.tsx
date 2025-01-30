// // src/components/TodoItem.test.tsx
// import { render, screen } from "@testing-library/react";
// import TodoItem from "./todo-item";

// describe("TodoItem", () => {
//     it("renders the todo title", () => {
//         render(<TodoItem title="Test Todo" completed={false} />);
//         expect(screen.getByText("Test Todo")).toBeInTheDocument();
//     });

//     it("displays a checked checkbox when completed", () => {
//         render(<TodoItem title="Test Todo" completed={true} />);
//         expect(screen.getByRole("checkbox")).toBeChecked();
//     });
// });