import { NextFunction, Request, Response } from 'express';
import sendHttpResponse from '../util/httpResponse';
import responseMessage from '../constant/responseMessage';
import httpError from '../util/httpError';
import quicker from '../util/quicker';

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            sendHttpResponse(req, res, 200, responseMessage.SUCCESS);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    health: (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timestamp: Date.now()
            };
            sendHttpResponse(req, res, 200, responseMessage.SUCCESS, healthData);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    }
};
