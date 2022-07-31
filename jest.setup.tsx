// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { StoreProvider } from 'easy-peasy';
import { render as rtlRender, RenderResult, cleanup } from '@testing-library/react';
import store from '@store/index';
import theme from '@lib/theme';
import { handlers } from '@lib/graphql/mocks/handlers';

jest.mock('next-auth/react', () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { username: 'admin', email: 'admin@email.com' },
    };
    return {
        __esModule: true,
        ...originalModule,
        useSession: jest.fn(() => {
            return { session: { data: mockSession, status: 'authenticated' } }; // return type is [] in v3 but changed to {} in v4
        }),
        getSession: jest.fn(() => {
            return { session: { data: mockSession, status: 'authenticated' } }; // return type is [] in v3 but changed to {} in v4
        }),
    };
});

/**
 * TODO: Set up needed:
 * Custom Render
 *  - Next Auth Session Provider
 *  - EasyPeasy Store provider
 *  - MUI theme provider
 *
 * Mocks
 *  - GraphQL mocks
 *  - useSession mock
 *  - /api/[...nextauth] mock
 */

const render = (ui: React.ReactElement, renderOptions = {}): RenderResult => {
    // console.log('CUSTOM RENDER');
    const Wrapper: React.FC = ({ children }) => (
        <ThemeProvider theme={theme}>
            <StoreProvider store={store}>{children}</StoreProvider>
        </ThemeProvider>
    );
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

jest.mock('next/dist/client/router', () => require('next-router-mock'));

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});

export * from '@testing-library/react';
export { render, server };
