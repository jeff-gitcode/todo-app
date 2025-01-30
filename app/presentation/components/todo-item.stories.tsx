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
        title: "Test Todo",
        completed: false,
    },
};

export const Completed: Story = {
    args: {
        title: "Test Todo",
        completed: true,
    },
};