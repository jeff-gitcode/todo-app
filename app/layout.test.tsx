import { render } from '@testing-library/react';
import { SessionProvider } from './session-provider';
import Layout from './layout';
import NavMeu from './presentation/components/nav-menu';
import { Providers } from './providers';

jest.mock('./session-provider', () => jest.fn(({ children }) => <div>{children}</div>));
jest.mock('./presentation/components/nav-menu', () => jest.fn(() => <div>NavMeu Component</div>));
jest.mock('./providers', () => jest.fn(({ children }) => <div>{children}</div>));

describe('Layout', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the layout with children', () => {
        const screen = render(
            <Layout>
                <div>Test Child</div>
            </Layout>
        );

        screen.debug();

        expect(SessionProvider).toHaveBeenCalled();
        expect(Providers).toHaveBeenCalled();
        // expect(screen.getByText(/NavMeu Component/i)).toBeInTheDocument();
        // expect(screen.getByText(/test child/i)).toBeInTheDocument();
    });
});