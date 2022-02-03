import mongoose, { Schema } from 'mongoose';

const { String, ObjectId } = Schema.Types;

const noteSchema = new Schema({
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
});

const Note = mongoose.models.notes || mongoose.model('notes', noteSchema);

export default Note;
