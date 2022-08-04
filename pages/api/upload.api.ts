import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import aws from 'aws-sdk';
import multiparty from 'multiparty';
import fs, { ReadStream } from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (session && req.method === 'POST') {
        try {
            aws.config.update({
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_SECRET_KEY,
                },
                region: process.env.AWS_REGION,
            });

            const s3 = new aws.S3();

            const form = new multiparty.Form();
            let uploadFile: ReadStream;
            let fileName: string;

            form.parse(req, async (uploadError, _, files) => {
                if (uploadError) {
                    throw new Error('Error parsing data: ' + uploadError.stack);
                }

                if (files.upload) {
                    uploadFile = fs.createReadStream(files.upload[0].path);
                    fileName = files.upload[0].originalFilename;

                    await s3.upload(
                        {
                            Bucket: process.env.AWS_BUCKET_NAME,
                            Body: uploadFile,
                            Key: fileName,
                        },
                        {},
                        (awsError, data) => {
                            if (awsError) throw new Error(awsError.message);
                            res.status(200).json({ url: data.Location });
                        }
                    );
                }
            });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    } else {
        res.status(401).json({ message: 'Unauthenticated' });
    }
};

export default handler;
