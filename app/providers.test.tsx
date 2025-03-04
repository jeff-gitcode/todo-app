import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Providers } from './providers';

jest.mock('@tanstack/react-query-devtools', () => ({
    ReactQueryDevtools: jest.fn(() => <div>ReactQueryDevtools Component</div>),
}));

describe('Providers', () => {
    it('renders the Providers component with children', () => {
        render(
            <Providers>
                <div>Test Child</div>
            </Providers>
        );

        expect(screen.getByText(/test child/i)).toBeInTheDocument();
        expect(screen.getByText(/reactquerydevtools component/i)).toBeInTheDocument();
    });
});