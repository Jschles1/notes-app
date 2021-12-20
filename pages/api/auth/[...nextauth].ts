import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    secret: 'testsecret',
    jwt: {
        secret: 'testsecret',
    },
    providers: [
        // CredentialsProvider({
        //     credentials: {},
        //     async authorize(credentials, req) {
        //         console.log('Credentials', credentials);
        //         return null;
        //     },
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            async profile(profile) {
                console.log('profile', profile);
                return {
                    id: 'hello',
                };
            },
        }),
    ],
    debug: true,
});