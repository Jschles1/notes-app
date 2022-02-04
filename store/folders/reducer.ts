import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Folder } from '../../interfaces';

const initialState = {
    folders: [],
    selected: '',
};

const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        fetchFoldersInit() {},
        fetchFoldersSuccess(state, action) {
            state.folders = action.payload;
            state.selected = state.selected || action.payload[0]._id;
        },
        fetchFoldersFail() {},
        // createFolderInit: {
        //   reducer: () => {},
        //   prepare: (name: { name: string }) => ({ payload: name }),
        // },
        // createFolderSuccess(state, action) {
        //   state.folders = state.folders.concat(action.payload);
        //   state.selected = (state.folders[state.folders.length - 1])._id;
        // },
        // createFolderFail() {},
        // updateFolderInit: {
        //   reducer: () => {},
        //   prepare: (folder: Folder) => ({ payload: folder }),
        // },
        // updateFolderSuccess(state, action) {
        //   state.folders = (state.folders as Folder[]).map((folder: Folder) => {
        //     if (action.payload._id === folder._id) {
        //       return { ...folder, name: action.payload.name };
        //     }
        //     return folder;
        //   });
        // },
        // updateFolderFail() {},
        // deleteFolderInit: {
        //   reducer: () => {},
        //   prepare: (id: string) => ({ payload: id }),
        // },
        // deleteFolderSuccess(state, action) {
        //   state.folders = state.folders.filter((folder) => folder._id !== action.payload);
        // },
        // deleteFolderFail() {},
        setSelectedFolder(state, action) {
            state.selected = action.payload;
        },
        resetFolders: () => initialState,
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.folders,
            };
        },
    },
});

export const {
    fetchFoldersInit,
    fetchFoldersSuccess,
    fetchFoldersFail,
    // createFolderInit,
    // createFolderFail,
    // createFolderSuccess,
    // updateFolderInit,
    // updateFolderSuccess,
    // updateFolderFail,
    // deleteFolderInit,
    // deleteFolderSuccess,
    // deleteFolderFail,
    setSelectedFolder,
    resetFolders,
} = foldersSlice.actions;

export default foldersSlice.reducer;
