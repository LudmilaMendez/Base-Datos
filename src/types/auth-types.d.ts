//!ESTE ARCHIVO FUE CREADO PARA QUE TS ENTIENDA QUE REQ.USER ES UN JWT PAYLOAD
//SIN EL, AUTH.MIDDLEWARE.TS DARIA ERROR POR req.user = decoded as JwtPayload;

import * as express from 'auth-types';
import { JwtPayload } from './auth';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}


