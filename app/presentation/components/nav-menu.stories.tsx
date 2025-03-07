import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { expect, userEvent, waitFor, within } from '@storybook/test';
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

const meta = {
    title: 'Components/NavMenu',
    component: NavMenu,
    tags: ['autodocs'],

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
                const useSession = nextAuth.useSession;
                const mock = createMock(nextAuth, 'useSession');
                mock.mockImplementation(useSession);
                // useSession.mockImplementation(() => ({ data: session, status: 'authenticated' }));
                return [mock];
            },
        },
    },
    play: async ({ canvasElement, parameters }) => {
        const canvas = within(canvasElement);
        const mock = getMock(parameters, nextAuth, 'useSession');
        mock.mockImplementation(() => ({ data: session, status: 'authenticated' }));
        expect(mock).toBeCalled();
    },
};

export const WithoutUser: Story = {
    args: {
        // Provide props to simulate a logged-out user
    }
};