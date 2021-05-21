import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../config/auth';

interface ITokenPayLoad{
    sub:string;
    exp:number;
}

export default function ensureAuthenticated(request:Request, response:Response, next:NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT Token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, auth.jwt.secret);

        const { sub, exp } = decoded as ITokenPayLoad;

        request.user = {
            id:sub
        }

        return next();
    } catch(erro){
        throw new Error('Invalid JWT token');
    }

}
