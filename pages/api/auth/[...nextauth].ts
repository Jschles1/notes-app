import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    secret: 'testsecret',
    jwt: {
        secret: 'testsecret',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                console.log('Credentials', credentials);
                return null;
            },
        }),
    ],
    debug: true,
});