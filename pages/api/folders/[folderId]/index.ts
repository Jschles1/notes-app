import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import User from '../../../../lib/server/models/User';
import Folder from '../../../../lib/server/models/Folder';
import connectToDatabase from '../../../../lib/server/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (session) {
        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email });

        switch (req.method) {
            case 'PATCH':
                // TODO
                break;
            case 'DELETE':
                // TODO
                break;
            default:
                break;
        }

        mongoose.connection.close();
    } else {
        res.status(401).json({ message: 'Unauthenticated' });
    }
};

export default handler;
