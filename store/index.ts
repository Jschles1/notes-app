import { createStore, persist, action, Action } from 'easy-peasy';

type AlertModel = {
    type: string;
    message: string;
};

export interface StoreModel {
    updatingFolder: string;
    setUpdatingFolder: Action<StoreModel, string>;
    searchQuery: string;
    setSearchQuery: Action<StoreModel, string>;
    alert: AlertModel;
    setAlert: Action<StoreModel, AlertModel>;
    clearAlert: Action<StoreModel>;
}

const store = createStore<StoreModel>(
    persist({
        updatingFolder: '',
        setUpdatingFolder: action((state, payload) => {
            state.updatingFolder = payload;
        }),
        searchQuery: '',
        setSearchQuery: action((state, payload) => {
            state.searchQuery = payload;
        }),
        alert: {
            type: '',
            message: '',
        },
        setAlert: action((state, payload) => {
            state.alert.type = payload.type;
            state.alert.message = payload.message;
        }),
        clearAlert: action((state) => {
            state.alert.type = '';
            state.alert.message = '';
        }),
    })
);

export default store;
