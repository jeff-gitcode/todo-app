import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import Layout from './layout';
import NavMeu from '@/components/NavMeu';
import Providers from '@/components/Providers';

jest.mock('next-auth/react', () => ({
    SessionProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('@/components/NavMeu', () => jest.fn(() => <div>NavMeu Component</div>));
jest.mock('@/components/Providers', () => jest.fn(({ children }) => <div>{children}</div>));

describe('Layout', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the layout with children', () => {
        render(
            <Layout>
                <div>Test Child</div>
            </Layout>
        );

        expect(screen.getByText(/navmeu component/i)).toBeInTheDocument();
        expect(screen.getByText(/test child/i)).toBeInTheDocument();
    });
});