import { signIn } from 'next-auth/react';
import { login } from './auth-service';

jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
}));

describe('login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('logs in successfully', async () => {
        const mockResult = { ok: true };
        (signIn as jest.Mock).mockResolvedValue(mockResult);

        const credentials = { email: 'test@example.com', password: 'password123' };
        const callbackUrl = '/dashboard';

        const result = await login(credentials, callbackUrl);

        expect(signIn).toHaveBeenCalledWith('credentials', { email: credentials.email, password: credentials.password, redirect: false });
        expect(result).toEqual({ ok: true });
    });

    it('handles login failure', async () => {
        (signIn as jest.Mock).mockRejectedValue(new Error('Login failed'));

        const credentials = { email: 'test@example.com', password: 'password123' };
        const callbackUrl = '/dashboard';

        await expect(login(credentials, callbackUrl)).rejects.toThrow('Login failed');
    });
});
