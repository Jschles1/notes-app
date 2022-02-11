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
                const data = {
                    name: req.body.name,
                };
                try {
                    const result = await Folder.findOneAndUpdate({ _id: req.body.id, user: user._id }, data, {
                        new: true,
                    });
                    res.json({
                        message: 'success',
                        data: result,
                        id: result._id,
                    });
                } catch (e: any) {
                    res.status(400).json({ error: e.message });
                }
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
