import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import Note from '../../../../../lib/server/models/Note';
import connectToDatabase from '../../../../../lib/server/connectToDatabase';
import sanitize from '../../../../../lib/server/sanitize';
import Folder from '../../../../../lib/server/models/Folder';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (session) {
        await connectToDatabase();

        const folderId = req.query.folderId;

        switch (req.method) {
            case 'GET':
                try {
                    const folder = await Folder.findById(folderId);
                    const notes = await Note.find({ folder: folderId });
                    const data = {
                        collection: notes,
                        folderName: folder.name,
                    };
                    res.status(200).json({
                        message: 'success',
                        data,
                    });
                } catch (e) {
                    res.status(400).json({ error: e.message });
                }
                break;
            case 'POST':
                const data = {
                    name: req.body.name,
                    description: sanitize(req.body.description),
                    folder: folderId,
                };

                try {
                    const result = await new Note(data);
                    await result.save();
                    res.json({
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
