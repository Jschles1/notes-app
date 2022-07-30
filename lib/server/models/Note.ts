import mongoose, { Schema } from 'mongoose';

const { String, ObjectId } = Schema.Types;

export const noteSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        folder: {
            type: ObjectId,
            ref: 'folders',
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.models.notes || mongoose.model('notes', noteSchema);

export default Note;
