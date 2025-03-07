import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { SessionProvider } from '../../session-provider';
import { Providers } from '../../providers';
import NavMenu from './nav-menu';
import * as nextAuth from "next-auth/react";
import { createMock, getMock } from 'storybook-addon-module-mock';

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

const meta = {
    title: 'Components/NavMenu',
    component: NavMenu,
    tags: ['autodocs'],
    parameters: {
        controls: { expanded: true },
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
    args: {
        // Provide props to simulate a logged-in user
    },
    parameters: {
        moduleMock: {
            mock: () => {
                const useSession = createMock(nextAuth, 'useSession');
                useSession.mockImplementation(() => ({ data: session, status: 'authenticated' }));
                return [useSession];
            },
        },
    },
};

export const WithoutUser: Story = {
    args: {
        // Provide props to simulate a logged-out user
    },
    parameters: {
        moduleMock: {
            mock: () => {
                const useSession = createMock(nextAuth, 'useSession');
                useSession.mockImplementation(() => ({ data: null, status: 'unauthenticated' }));
                return [useSession];
            },
        },
    },
};