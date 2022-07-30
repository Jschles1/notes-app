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

    const UserModel = db.model('users', userSchema);
    const FolderModel = db.model('folders', folderSchema);
    const NoteModel = db.model('notes', noteSchema);

    return {
        connection: db,
        User: UserModel,
        Folder: FolderModel,
        Note: NoteModel,
    };
};

export default connectToDatabase;
