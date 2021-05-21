import 'reflect-metadata';

import  express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from '.././http/index.routes';
import uploadConfig from '.././config/upload';

import './database/connection';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder), () => {console.log('ok')});
app.use(routes);

app.use((erro: Error, request: Request, response: Response, next: NextFunction) => {
    if (erro instanceof Error) {
        if(erro.message=='JWT Token is missing' || erro.message=='Invalid JWT token' || erro.message=='Invalid content'){
            return response.status(401).json({
                status: 'error',
                message: erro.message,
            })
        }
        else{
            if(erro.message=='User not found'){
                return response.status(404).json({
                    status: 'error',
                    message: erro.message,
                })
            }
            else{
                return response.status(400).json({
                    status: 'error',
                    message: erro.message,
                })
            }
        }
    }


    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
});

app.listen(3000, () => console.log("server running on PORT 3000"))
