import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ErrorBoundary from './error-boundary';

const meta: Meta<typeof ErrorBoundary> = {
    title: 'Components/ErrorBoundary',
    component: ErrorBoundary,
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

const ErrorComponent = () => {
    throw new Error('This is a test error');
};

export const Default: Story = {
    render: (args) => (
        <ErrorBoundary {...args}>
            <ErrorComponent />
        </ErrorBoundary>
    ),
    args: {},
};