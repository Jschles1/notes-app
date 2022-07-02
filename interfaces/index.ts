// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface User {
    id: number;
    name: string;
    email: string;
    image: string;
}

export interface Folder {
    _id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    user: string;
}

export interface Note {
    _id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    folder: string;
    description: string;
}
