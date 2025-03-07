import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { expect, userEvent, waitFor, within, screen } from '@storybook/test';
import { SessionProvider } from '../../session-provider';
import { Providers } from '../../providers';
import NavMenu from './nav-menu';
import * as nextAuth from "next-auth/react";
import { createMock, getMock, render } from 'storybook-addon-module-mock';

const session = {
    user: {
        name: 'Test User',
        email: 'test@example.com',
        image: 'https://example.com/avatar.jpg',
        id: '123',
        role: 'user',
        expires: '2022-01-01T00:00:00.000Z',
    },
}

const routerPush = fn();

const meta = {
    title: 'Components/NavMenu',
    component: NavMenu,
    tags: ['autodocs'],
    parameters: {
        controls: { expanded: true },
        nextjs: {
            // 👇 As in the Next.js application, next/navigation only works using App Router
            // appDirectory: true,
        },
        jest: ['nav-menu.test.tsx'],
    },
    // decorators: [
    //     (Story) => (
    //         <SessionProvider>
    //             <Providers>
    //                 <Story />
    //             </Providers>
    //         </SessionProvider>
    //     ),
    // ],
} satisfies Meta<typeof NavMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        // Provide default props here if needed
    },
};

export const WithUser: Story = {
    beforeEach: () => {
        // Reset the mock before each test
        fn().mockClear();

    },
    args: {
        // Provide props to simulate a logged-in user
    },
    parameters: {
        moduleMock: {
            mock: () => {
                const useSession = nextAuth.useSession;
                const mock = createMock(nextAuth, 'useSession');
                mock.mockImplementation(useSession);
                return [mock];
            },
        },
    },
    play: async ({ canvasElement, parameters }) => {
        const mock = getMock(parameters, nextAuth, 'useSession');
        mock.mockImplementation(() => ({ data: session, status: 'authenticated' }));
        expect(mock).toBeCalled();

        const canvas = within(canvasElement);
        const homeButton = screen.getByRole('link', { name: /Home/i });
        userEvent.click(homeButton);
        await waitFor(() => expect(routerPush).toBeCalledTimes(1));


    },
};

export const WithoutUser: Story = {
    args: {
        // Provide props to simulate a logged-out user
    },
    parameters: {
        moduleMock: {
            mock: () => {
                const useSession = nextAuth.useSession;
                const mock = createMock(nextAuth, 'useSession');
                mock.mockImplementation(useSession);
                return [mock];
            },
        },
        nextjs: {
            appDirectory: false,
            router: {
                push: routerPush,
            },
        },
    },
    play: async ({ canvasElement, parameters }) => {
        const mock = getMock(parameters, nextAuth, 'useSession');
        mock.mockImplementation(() => ({ data: {}, status: 'unauthenticated' }));
        expect(mock).toBeCalled();

        const canvas = within(canvasElement);
        const loginButton = canvas.getByRole('link', { name: /Sign In/i });
        userEvent.click(loginButton);
        await waitFor(async () => expect(routerPush).toBeCalledTimes(1));
    },
};