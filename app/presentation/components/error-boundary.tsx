import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // Define a state variable to track whether is an error or not
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo });
    }

    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <Alert type="error">
                    <h2>Oops, there is an error!</h2>
                    <Button onClick={() => window.location.reload()}>Reload</Button>
                </Alert>
            );
        }

        // Render children components
        return this.props.children;
    }
}

export default ErrorBoundary;