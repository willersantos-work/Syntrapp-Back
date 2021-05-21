import uploadConfig from '../../../config/upload';
import fs from 'fs';
import path from 'path';

import IStorageProvider from "./IStorageProvider";

class StorageProvider implements IStorageProvider{
    public async saveFile(file: string): Promise<void>{
        const filePath = path.resolve(uploadConfig.tmpFolder, file);
        const fileNewPath = path.resolve(uploadConfig.uploadsFolder, file);

        await fs.promises.rename(
            filePath,
            fileNewPath,
        );
    };

    public async deleteFile(file: string): Promise<void>{
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try{
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath)
    };

    public async deleteTempFile(file: string): Promise<void>{
        const filePath = path.resolve(uploadConfig.tmpFolder, file);

        try{
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath)
    };
}

export default StorageProvider;
