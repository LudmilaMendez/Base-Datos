//!ESTE ARCHIVO FUE CREADO PARA QUE TS ENTIENDA QUE REQ.USER ES UN JWT PAYLOAD
//SIN EL, AUTH.MIDDLEWARE.TS DARIA ERROR POR req.user = decoded as JwtPayload;

import { JwtPayload } from './auth';
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload; //EL ? ES PORQUE PUEDE O NO VENIR
        }
    }
}