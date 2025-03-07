import React from 'react';
import type { Preview } from '@storybook/react'
import { Providers } from '../app/providers';
import { SessionProvider } from '../app/session-provider';
import '../app/globals.css'

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
    (Story) => (
      <SessionProvider>
        <Providers>
          <Story />
        </Providers>
      </SessionProvider>
    )
  ],
};

export default preview;