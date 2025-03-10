import { Meta, StoryObj } from '@storybook/react';
import SignUpForm from './signup-form';
import { createMock } from 'storybook-addon-module-mock';
import * as authService from '@/app/(infrastructure)/services/auth-service';
import { waitFor, within, expect, userEvent } from '@storybook/test';
import * as nextNavigation from '@storybook/nextjs/navigation.mock';

const mockRegister = createMock(authService, 'register');
const redirect = createMock(nextNavigation, 'redirect');

const meta = {
    title: 'Components/SignUpForm',
    component: SignUpForm,
    tags: ['autodocs'],
    parameters: {
        controls: { expanded: true },
        jest: ['signup-form.test.tsx'],
    },
} satisfies Meta<typeof SignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    beforeEach: () => {
        // Reset the mock before each test
        mockRegister.mockClear();
        redirect.mockClear();
    },
    args: {
        // Provide default props here if needed
    },
    play: async ({ canvasElement }) => {
        mockRegister.mockReturnValue({ ok: true, error: null, status: 200, url: null });

        const canvas = within(canvasElement);

        const nameInput = canvas.getByLabelText(/name/i);
        const emailInput = canvas.getByLabelText(/email/i);
        const passwordInput = canvas.getAllByLabelText(/password/i)[0];
        const passwordConfirmationInput = canvas.getByLabelText(/password confirmation/i);

        await userEvent.type(nameInput, 'Test User');
        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password123');
        await userEvent.type(passwordConfirmationInput, 'password123');

        const signUpButton = canvas.getByRole('button', { name: /sign up/i });
        expect(signUpButton).toBeInTheDocument();

        await userEvent.click(signUpButton);

        await waitFor(async () => {
            await expect(mockRegister).toHaveBeenCalled();
            await expect(redirect).toHaveBeenCalled();
        });
    }
};