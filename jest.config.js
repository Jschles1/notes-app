// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleDirectories: ['node_modules', '<rootDir>/'],
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@store/(.*)$': '<rootDir>/store/$1',
        '^@lib/(.*)$': '<rootDir>/lib/$1',
        '^@pages/(.*)$': '<rootDir>/pages/$1',
        '^@/(.*)$': '<rootDir>/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/ckeditor5/', '<rootDir>/lib/graphql/mocks/'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
