import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import Note from '../../../../../lib/server/models/Note';
import connectToDatabase from '../../../../../lib/server/connectToDatabase';
import sanitize from '../../../../../lib/server/sanitize';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (session) {
        await connectToDatabase();

        const folderId = req.query.folderId as string;
        const noteId = req.query.noteId as string;

        switch (req.method) {
            case 'PATCH':
                const data = {
                    name: req.body.name,
                    description: sanitize(req.body.description) as any,
                };

                try {
                    const note = await Note.findOneAndUpdate({ folder: folderId, _id: noteId }, data, {
                        new: true,
                    }).clone();
                    res.json({
                        message: 'success',
                        data: note,
                    });
                    res.status(200);
                } catch (e: any) {
                    res.status(400).json({ error: e.message });
                }
                break;
            case 'DELETE':
                try {
                    await Note.findByIdAndDelete(noteId);
                    res.json({ message: 'deleted' });
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
