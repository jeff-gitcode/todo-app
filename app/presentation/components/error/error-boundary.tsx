'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Fallback } from '@radix-ui/react-avatar';
import FallbackErrorComponent from './fallback-error-component';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // Define a state variable to track whether is an error or not
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo });
        // Send error to Sentry
        // Sentry.captureException(error);  
    }

    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <FallbackErrorComponent error={this.state.error} />
            );
        }

        // Render children components
        return this.props.children;
    }
}

export default ErrorBoundary;