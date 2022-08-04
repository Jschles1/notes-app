import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectToDatabase from '@lib/server/connectToDatabase';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            async profile(profile) {
                const db = await connectToDatabase();
                try {
                    const user = await db.User.findOne({
                        email: profile.email,
                    }).clone();

                    if (!user) {
                        const newUser = await new db.User({
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture,
                        });

                        const savedUser = await newUser.save();

                        const defaultFolder = await new db.Folder({
                            name: 'New Folder',
                            user: savedUser._id,
                        });

                        await defaultFolder.save();
                    }
                } catch (e) {
                    db.connection.close();
                    throw new Error(`Error Signing In: ${e}`);
                }

                db.connection.close();

                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            },
        }),
    ],
});
