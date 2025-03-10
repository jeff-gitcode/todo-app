// import React from 'react';
// import '@testing-library/jest-dom';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import SignUpForm from './signup-form';
// import { register } from '@/app/(infrastructure)/services/auth-service';

// jest.mock('next-auth/react', () => ({
//     signIn: jest.fn(),
// }));

// jest.mock('@/app/(infrastructure)/services/auth-service', () => ({
//     register: jest.fn(),
// }));

// describe('SignUpForm', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     it('renders the form correctly', () => {
//         const screen = render(<SignUpForm />);

//         expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//         expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
//     });

//     it('submits the form with valid data', async () => {
//         const screen = render(<SignUpForm />);

//         fireEvent.input(screen.getByLabelText(/name/i), {
//             target: { value: 'Test User' },
//         });
//         fireEvent.input(screen.getByLabelText(/email/i), {
//             target: { value: 'test@example.com' },
//         });
//         fireEvent.input(screen.getByLabelText(/password/i), {
//             target: { value: 'password123' },
//         });

//         fireEvent.submit(screen.getByRole('button', { name: /sign up/i }));

//         await waitFor(() => {
//             expect(register).toHaveBeenCalledWith({
//                 name: 'Test User',
//                 email: 'test@example.com',
//                 password: 'password123',
//             });
//         });
//     });

//     it('shows validation errors for invalid data', async () => {
//         const screen = render(<SignUpForm />);

//         fireEvent.submit(screen.getByRole('button', { name: /sign up/i }));

//         await waitFor(() => {
//             expect(screen.getByText(/name is required/i)).toBeInTheDocument();
//             expect(screen.getByText(/email is required/i)).toBeInTheDocument();
//             expect(screen.getByText(/password is required/i)).toBeInTheDocument();
//         });
//     });
// });