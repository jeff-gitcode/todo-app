import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testTimeout: 20000,
  modulePathIgnorePatterns: ["spec.js", "spec.ts", "spec.tsx"],
  // transformIgnorePatterns: [
  //   '/node_modules/',
  //   '^.+\\.module\\.(css|sass|scss)$',
  //   '/node_modules/(?!@next-auth)',
  // ],
  transformIgnorePatterns: [`/node_modules/(?!@auth/core)`],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
