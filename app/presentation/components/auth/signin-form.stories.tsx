import { act } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn, waitFor, within, expect, userEvent } from '@storybook/test';
import { fireEvent } from '@testing-library/dom';
import * as nextAuthReact from 'next-auth/react';
import * as nextNavigation from '@storybook/nextjs/navigation.mock';
import * as authService from '@/app/(infrastructure)/services/auth-service';

import SignInForm from './signin-form';
import { createMock } from 'storybook-addon-module-mock';

const login = createMock(authService, 'login');
const redirect = fn(nextNavigation.redirect).mockName('redirect');

const meta = {
    title: 'Components/SignInForm',
    component: SignInForm,
    tags: ['autodocs'],
    parameters: {
        controls: { expanded: true },
        jest: ['signin-form.test.tsx'],
    },
} satisfies Meta<typeof SignInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    beforeEach: () => {
        // Reset the mock before each test
        login.mockClear();
        redirect.mockClear();
    },
    play: async ({ canvasElement, parameters }) => {
        login.mockReturnValue({ ok: true, error: null, status: 200, url: null });
        // redirect.mockReturnValue({ url: '/' });
        const canvas = within(canvasElement);

        const emailInput = canvas.getByLabelText(/email/i);
        const passwordInput = canvas.getByLabelText(/password/i);

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password123');

        const signInButton = canvas.getByRole('button', { name: /sign in/i });
        expect(signInButton).toBeInTheDocument();

        // await userEvent.click(signInButton);
        // // await fireEvent.click(signInButton);
        act(() => {
            fireEvent.click(signInButton);
        });

        await waitFor(async () => {
            await expect(login).toHaveBeenCalled();
            await expect(redirect).toHaveBeenCalled();
        });
    },
    args: {
        // Provide default props here if needed
    },

};
