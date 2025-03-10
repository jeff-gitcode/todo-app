import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/presentation/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-actions",
    "@storybook/addon-jest",
    "@storybook/experimental-addon-test",
    'storybook-addon-vite-mock',
    {
      name: 'storybook-addon-module-mock',
      options: {
        exclude: ['**/node_modules/@mui/**'],
      },
    },
  ],
  "framework": '@storybook/nextjs',
  // "framework": {
  //   "name": "@storybook/experimental-nextjs-vite",
  //   "options": {}
  // },
  "staticDirs": [
    "..//public"
  ],
};
export default config;