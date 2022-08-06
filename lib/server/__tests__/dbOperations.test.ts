/**
 * @jest-environment node
 */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import connectToDatabase from '../connectToDatabase';
import * as DbOperations from '../dbOperations';

const testUser = {
    _id: '62ba3cde43a61f0ccc038edb',
    name: 'Hello World',
    email: 'admin@email.com',
    image: 'https://lh3.googleusercontent.com/a/AATXAJzLlJXt90hZvSHUts5579HkWHGC5-o4xfGeaRk6=s96-c',
};

const testFolder = (userId = '') => ({
    name: 'New Folder',
    user: userId,
    _id: '62ba3f66d94016b5eaf081f1',
});

const testNote = (userId) => ({
    name: 'Test Note',
    description: 'Test Description',
    folder: testFolder(userId)._id,
    user: userId,
    _id: '62ba4469dfff43bd48922599',
});

const populateMockDatabase = async (db) => {
    const newUser = await new db.User(testUser);
    const savedUser = await newUser.save();

    const defaultFolder = await new db.Folder(testFolder(savedUser._id));
    await defaultFolder.save();

    const defaultNote = await new db.Note(testNote(savedUser._id));
    await defaultNote.save();
};

describe('MongoDB Database Operations', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        global.db = await connectToDatabase(mongoServer.getUri());
        await populateMockDatabase(global.db);
    });

    afterAll(async () => {
        await global.db.connection.close();
    });

    it('Should connect to MongoDB cluster without error', async () => {
        expect(global.db.connection._hasOpened).toBeTruthy();
    });

    it('Executes getUser without error', async () => {
        const { db } = global;
        const user = await DbOperations.getUser(db, testUser.email);
        expect(user.email).toBe(testUser.email);
        expect(user.name).toBe(testUser.name);
        expect(new mongoose.Types.ObjectId(user._id)).toEqual(new mongoose.Types.ObjectId(testUser._id));
    });

    it('Executes getFolders without error', async () => {
        const { db } = global;
        const folders = await DbOperations.getFolders(db, testUser._id);
        const folderToMatch = testFolder(testUser._id);
        expect(folders.length).toBe(1);
        expect(folders[0].name).toBe(folderToMatch.name);
        expect(new mongoose.Types.ObjectId(folders[0].user)).toEqual(new mongoose.Types.ObjectId(testUser._id));
        expect(new mongoose.Types.ObjectId(folders[0]._id)).toEqual(new mongoose.Types.ObjectId(folderToMatch._id));
    });

    it('Executes getNotes without error', async () => {
        const { db } = global;
        const notes = await DbOperations.getNotes(db, testFolder(testUser._id));
        const noteToMatch = testNote(testUser._id);
        expect(notes.length).toBe(1);
        expect(notes[0].name).toBe(noteToMatch.name);
        expect(notes[0].description).toBe(noteToMatch.description);
        expect(new mongoose.Types.ObjectId(notes[0].folder)).toEqual(
            new mongoose.Types.ObjectId(testFolder(testUser._id)._id)
        );
        expect(new mongoose.Types.ObjectId(notes[0]._id)).toEqual(new mongoose.Types.ObjectId(noteToMatch._id));
    });

    it('Executes createFolder, getFolderById, updateFolder, and deleteFolder without error', async () => {
        const { db } = global;
        const newFolder = await DbOperations.createFolder(db, testUser._id, 'Folder 2');
        expect(newFolder.name).toBe('Folder 2');
        expect(new mongoose.Types.ObjectId(newFolder.user)).toEqual(new mongoose.Types.ObjectId(testUser._id));
        await DbOperations.saveFolderToDatabase(newFolder);

        const result = await DbOperations.getFolderById(db, newFolder._id);
        expect(result.name).toBe('Folder 2');

        const updateResult = await DbOperations.updateFolder(db, newFolder._id, testUser._id, {
            name: 'Updated Folder',
        });
        expect(updateResult.name).toBe('Updated Folder');

        const deleteResult = await DbOperations.deleteFolder(db, updateResult._id, testUser._id);
        expect(deleteResult.ok).toBe(1);
    });

    it('Executes createNote, updateNote, and deleteNote without error', async () => {
        const { db } = global;
        const folderId = testFolder(testUser._id)._id;
        const newNote = await DbOperations.createNote(db, {
            name: 'New Note',
            description: 'New Note Description',
            folder: folderId,
        });
        expect(newNote.name).toBe('New Note');
        expect(newNote.description).toBe('New Note Description');
        expect(new mongoose.Types.ObjectId(newNote.folder)).toEqual(new mongoose.Types.ObjectId(folderId));
        await DbOperations.saveNoteToDatabase(newNote);

        const updateResult = await DbOperations.updateNote(db, folderId, newNote._id, {
            name: 'Updated Note',
            description: 'Updated Description',
        });
        expect(updateResult.name).toBe('Updated Note');
        expect(updateResult.description).toBe('Updated Description');

        await DbOperations.deleteNote(db, newNote._id);
        const note = await db.Note.findById(newNote._id);
        expect(note).toBe(null);
    });
});
