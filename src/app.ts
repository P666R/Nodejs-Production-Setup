import path from 'path';
import express, { Application, NextFunction, Request, Response } from 'express';
import router from './router/apiRouter';
import globalErrorHandler from './middleware/globalErrorHandler';
import responseMessage from './constant/responseMessage';
import httpError from './util/httpError';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/v1', router);

// 404 error handler
app.use('*', (req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'));
    } catch (err) {
        httpError(next, err, req, 404);
    }
});

// Global error handler
app.use(globalErrorHandler);

export default app;
