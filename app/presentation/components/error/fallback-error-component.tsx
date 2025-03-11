'use client';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import React from 'react';

const FallbackErrorComponent = ({ error }: { error: Error | null }) => (
    <Alert variant='destructive'>
        <h2>Oops, there is an error!</h2>
        <p>{error?.message}</p>
        <Button onClick={() => window.location.reload()}>Reload</Button>
    </Alert>
);

export default FallbackErrorComponent;