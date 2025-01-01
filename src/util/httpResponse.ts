import { Request, Response } from 'express';
import config from '../config/config';
import { THttpResponse } from '../types/types';
import { EApplicationEnvironment } from '../constant/application';
import logger from './logger';

const sendHttpResponse = (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip ?? null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data
    };

    //  Log
    logger.info('CONTROLLER_RESPONSE', { meta: response });

    // Hide IP in production
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip;
    }

    res.status(responseStatusCode).json(response);
};

export default sendHttpResponse;
