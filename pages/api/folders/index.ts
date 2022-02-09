import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import User from '../../../lib/server/models/User';
import Folder from '../../../lib/server/models/Folder';
import connectToDatabase from '../../../lib/server/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (session) {
        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email });

        let reqBody;

        if (req.body) {
            reqBody = JSON.parse(req.body);
        }

        switch (req.method) {
            case 'GET':
                try {
                    const folders = await Folder.find({ user: user._id });
                    res.status(200).json({
                        message: 'success',
                        data: folders,
                    });
                } catch (e) {
                    res.status(400).json({ error: e.message });
                }
                break;
            case 'POST':
                try {
                    const result = await new Folder({
                        name: reqBody.name,
                        user: user._id,
                    });
                    await result.save();
                    res.status(200).json({
                        message: 'success',
                        data: result,
                        id: result._id,
                    });
                } catch (e: any) {
                    res.status(400).json({ error: e.message });
                }
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
