import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from './signin-form';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),

    useForm: jest.fn(() => ({
        register: jest.fn(),
        handleSubmit: jest.fn(),
        formState: { errors: {} },
        setError: jest.fn(),
        clearErrors: jest.fn(),
        control: jest.fn(),
        defaultValues: {
            email: '',
            password: '',
        },
    })),
    zodResolver: jest.fn(),
}));

describe('SignInForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form correctly', () => {
        const screen = render(<SignInForm />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('submits the form with valid data', async () => {
        const screen = render(<SignInForm />);

        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.input(screen.getByLabelText(/password/i), {
            target: { value: 'password123' },
        });

        fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith('credentials', {
                redirect: false,
                email: 'test@example.com',
                password: 'password123',
            });
        });
    });

    it('shows validation errors for invalid data', async () => {
        const screen = render(<SignInForm />);

        fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        });
    });
});