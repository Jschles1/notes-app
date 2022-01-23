import mongoose, { Schema } from 'mongoose';

const { String, ObjectId } = Schema.Types;

export const folderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    notes: [{ type: ObjectId, ref: 'notes' }],
    user: {
        type: ObjectId,
        ref: 'users',
    },
});

const Folder = mongoose.models.folders || mongoose.model('folders', folderSchema);

export default Folder;
