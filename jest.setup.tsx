// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';
import { ThemeProvider } from '@mui/material/styles';
import { StoreProvider } from 'easy-peasy';
import { render as rtlRender, RenderResult, cleanup } from '@testing-library/react';
import store from '@store/index';
import theme from '@lib/theme';
import { handlers } from '@lib/graphql/mocks/handlers';

const testUser = {
    username: 'admin',
    email: 'admin@email.com',
    image: 'https://lh3.googleusercontent.com/a/AATXAJzLlJXt90hZvSHUts5579HkWHGC5-o4xfGeaRk6=s96-c',
};

jest.mock('next-auth/react', () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: testUser,
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

jest.mock('next/head', () => {
    return {
        __esModule: true,
        default: ({ children }: { children: Array<React.ReactElement> }) => {
            return <>{children}</>;
        },
    };
});

jest.mock('@lib/graphql/hooks', () => ({
    __esModule: true,
    useFolders: jest.fn(() => {
        const testFolder = {
            _id: '123',
            name: 'Folder Name',
            user: '321',
            createdAt: '1649370960451',
            updatedAt: '1649370960451',
            notes: [
                {
                    _id: '234',
                    name: 'Note Name',
                    description: 'Note Description',
                    folder: '123',
                    createdAt: '1649370960451',
                    updatedAt: '1649370960451',
                },
            ],
        };
        return {
            folders: [testFolder],
            selectedFolder: testFolder,
            loading: false,
            revalidate: jest.fn(() => {}),
            error: null,
        };
    }),
}));

jest.mock('@lib/hooks/useLoggedInUser', () => ({
    __esModule: true,
    default: () => ({
        user: testUser,
        email: testUser.email,
        isLoading: false,
    }),
}));

const render = (ui: React.ReactElement, renderOptions = {}): RenderResult => {
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
    cleanup();
    server.listen();
});

afterEach(() => {
    cleanup();
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});

export * from '@testing-library/react';
export { render, server };
