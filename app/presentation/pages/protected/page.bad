import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SessionProvider, useSession } from 'next-auth/react';
import ProtectedPage from './page';

// Mock the useSession hook
jest.mock('next-auth/react', () => ({
    ...jest.requireActual('next-auth/react'),
    useSession: jest.fn(),
}));

const meta: Meta<typeof ProtectedPage> = {
    title: 'Pages/ProtectedPage',
    component: ProtectedPage,
    decorators: [
        (Story) => (
            <SessionProvider>
                <Story />
            </SessionProvider>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof ProtectedPage>;

export const Default: Story = {
    args: {},
};

export const Loading: Story = {
    args: {},
    parameters: {
        nextAuth: {
            session: {
                data: null,
                status: 'loading',
            },
        },
    },
};

export const Unauthenticated: Story = {
    args: {},
    parameters: {
        nextAuth: {
            session: {
                data: null,
                status: 'unauthenticated',
            },
        },
    },
};

export const Authenticated: Story = {
    args: {},
    parameters: {
        nextAuth: {
            session: {
                data: { user: { name: 'John Doe', email: 'john@example.com' } },
                status: 'authenticated',
            },
        },
    },
};