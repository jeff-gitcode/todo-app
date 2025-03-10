import React, { useState } from 'react';
import type { Preview } from '@storybook/react'
import { SessionProvider } from 'next-auth/react';
import { Session } from "next-auth";
import '../app/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      const session: Session = {
        user: {
          id: "",
          name: "",
          email: "",
          image: "",
        },
        expires: "",
      };

      const [queryClient] = useState(() => new QueryClient());

      return (
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </SessionProvider>
      )
    }
  ],
};

export default preview;