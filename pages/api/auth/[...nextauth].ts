import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import mongoose from 'mongoose';
import User from '../../../lib/server/models/User';
import Folder from '../../../lib/server/models/Folder';
import connectToDatabase from '../../../lib/server/connectToDatabase';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    secret: 'testsecret',
    jwt: {
        secret: 'testsecret',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            async profile(profile) {
                await connectToDatabase();
                try {
                    const user = await User.findOne({
                        email: profile.email,
                    }).clone();

                    if (!user) {
                        const newUser = await new User({
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture,
                        });

                        const savedUser = await newUser.save();

                        const defaultFolder = await new Folder({
                            name: 'New Folder',
                            user: savedUser._id,
                        });

                        await defaultFolder.save();
                    }
                } catch (e) {
                    mongoose.connection.close();
                    throw new Error(`Error Signing In: ${e}`);
                }

                mongoose.connection.close();

                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            },
        }),
    ],
    debug: true,
});
