import {create} from 'zustand'
import type { ItemFile } from '../types/item-file';

type FilesStore = {
    files: ItemFile[];
    setFiles: (items: ItemFile[]) => void;
}

const useFiles = create<FilesStore>()((set, get) => ({
    files: [],
    setFiles: (items: ItemFile[])=> {
        set({
            files: items
        })
    }
}));

export {
    useFiles
};