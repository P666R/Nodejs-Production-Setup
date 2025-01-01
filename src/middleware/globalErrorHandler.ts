import { NextFunction, Request, Response } from 'express';
import { THttpError } from '../types/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err: THttpError, _: Request, res: Response, __: NextFunction) => {
    res.status(err.statusCode).json(err);
};

export default globalErrorHandler;
