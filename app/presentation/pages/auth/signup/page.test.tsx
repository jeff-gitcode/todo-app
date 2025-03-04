import { render, screen } from '@testing-library/react';
import SignUpPage from './page';

jest.mock('@/app/presentation/components/auth/signup-form', () => jest.fn(() => <div>SignUpForm Component</div>));

describe('SignUpPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the SignUpForm component', () => {
        render(<SignUpPage />);

        expect(screen.getByText(/signupform component/i)).toBeInTheDocument();
    });
});