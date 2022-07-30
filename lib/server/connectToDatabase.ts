import mongoose from 'mongoose';
import { folderSchema } from './models/Folder';
import { userSchema } from './models/User';
import { noteSchema } from './models/Note';

const connectionString = process.env.ATLAS_URI as string;

const connectToDatabase = async () => {
    const db: mongoose.Connection = await mongoose
        .createConnection(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'notes-app',
        } as any)
        .asPromise();

    db.model('users', userSchema);
    db.model('folders', folderSchema);
    db.model('notes', noteSchema);

    return db;
};

export default connectToDatabase;
