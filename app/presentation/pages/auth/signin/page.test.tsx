import { render, screen } from '@testing-library/react';
import SignInPage from './page';

jest.mock('@/app/presentation/components/auth/signin-form', () => jest.fn(() => <div>SignInForm Component</div>));

describe('SignInPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the SignInForm component', () => {
        render(<SignInPage />);

        expect(screen.getByText(/signinform component/i)).toBeInTheDocument();
    });
});