import fs from 'fs/promises'
import path from 'path'
import type { AppFile } from './types/app-file';


const PATH_UPLOADS = path.join(__dirname, "../uploads");

export async function getFiles ()
{
    const files: AppFile[] = [];
    const result = await fs.readdir(PATH_UPLOADS);
    for (const file of result)
    {
        const stat = await fs.stat(path.join(PATH_UPLOADS, file));
        if (!stat.isDirectory() && file !== ".gitignore")
        {
            files.push({
                name: file,
                size: stat.size,
                location: path.join(PATH_UPLOADS, file)
            })
        }
    }
    return files;
}