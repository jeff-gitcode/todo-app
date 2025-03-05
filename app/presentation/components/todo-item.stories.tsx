// src/components/TodoItem.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import TodoItem from "./todo-item";

const meta: Meta<typeof TodoItem> = {
    title: "Components/TodoItem",
    component: TodoItem,
};

export default meta;

type Story = StoryObj<typeof TodoItem>;

export const Default: Story = {
    args: {
        todo: {
            id: 1,
            title: "Test Todo",
        },
        onSuccess: () => {
            console.log("Success!");
        }
    },
};

export const Completed: Story = {
    args: {
        todo: {
            id: 1,
            title: "Test Todo",
        },
        onSuccess: () => {
            console.log("Success!");
        }
    },
};