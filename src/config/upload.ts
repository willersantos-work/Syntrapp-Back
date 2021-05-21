import multer from 'multer';
import path from 'path';
//para importar arquivos, dentro do site explica como funciona a biblioteca
const tmpFolder = path.resolve(__dirname, '..', 'tmp');
const uploadsFolder = path.resolve(__dirname, '..', 'tmp', 'uploads');

export default {
    tmpFolder,
    uploadsFolder,

    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename: (request, file, callback) => {
                const fileHash = `${Date.now()}`;

                //criação do nome do arquivo de forma única
                const fileName = `${fileHash}-${file.originalname.replace(/\s/g, '')}`;

                //callback(erro, nome do arquivo)
                return callback(null, fileName)
            }
        })
    }
}
