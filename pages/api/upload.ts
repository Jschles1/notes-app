import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import multiparty from 'multiparty';
import fs, { ReadStream } from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (session) {
        const form = new multiparty.Form();
        let uploadFile: ReadStream;
        form.parse(req, (err, fields, files) => {
            // TODO: Handle error
            if (files.upload) {
                uploadFile = fs.createReadStream(files.upload[0].path);
            }
        });
        if (req.method === 'POST') {
            res.status(200).json({ message: 'Hello' });
        }
    } else {
        res.status(401).json({ message: 'Unauthenticated' });
    }
};

export default handler;