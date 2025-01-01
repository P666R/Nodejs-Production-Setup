import { NextFunction, Request, Response } from 'express';
import sendHttpResponse from '../util/httpResponse';
import responseMessage from '../constant/responseMessage';
import httpError from '../util/httpError';

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            sendHttpResponse(req, res, 200, responseMessage.SUCCESS);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    }
};
