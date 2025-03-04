import { render, screen } from '@testing-library/react';
import ProtectedPage from './page';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

jest.mock('../../components/todo-list', () => jest.fn(() => <div>TodoList Component</div>));

describe('ProtectedPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state', () => {
        (useSession as jest.Mock).mockReturnValue({ data: null, status: 'loading' });

        render(<ProtectedPage />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders access denied state', () => {
        (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });

        render(<ProtectedPage />);

        expect(screen.getByText(/access denied/i)).toBeInTheDocument();
    });

    it('renders protected page with TodoList when authenticated', () => {
        const session = {
            user: {
                name: 'Test User',
                email: 'test@example.com',
            },
        };
        (useSession as jest.Mock).mockReturnValue({ data: session, status: 'authenticated' });

        render(<ProtectedPage />);

        expect(screen.getByText(/protected page/i)).toBeInTheDocument();
        expect(screen.getByText(/todolist component/i)).toBeInTheDocument();
    });
});