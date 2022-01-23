import mongoose from 'mongoose';
import { ConnectionOptions } from 'tls';

const connectionString = process.env.ATLAS_URI as string;

const connectToDatabase = async () => {
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'notes-app',
    } as ConnectionOptions);
};

export default connectToDatabase;
