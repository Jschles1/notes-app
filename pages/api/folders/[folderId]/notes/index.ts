import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import Note from '../../../../../lib/server/models/Note';
import connectToDatabase from '../../../../../lib/server/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (session) {
        await connectToDatabase();

        const folderId = req.query.folderId;

        switch (req.method) {
            case 'GET':
                try {
                    const folders = await Note.find({ folder: folderId });
                    res.status(200).json({
                        message: 'success',
                        data: folders,
                    });
                } catch (e) {
                    res.status(400).json({ error: e.message });
                }
                break;
            case 'POST':
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
