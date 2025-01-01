import app from './app';
import config from './config/config';
import logger from './util/logger';

const server = app.listen(config.PORT, () => {
    logger.info('APPLICATION_STARTED', {
        meta: {
            PORT: config.PORT,
            SERVER_URL: config.SERVER_URL
        }
    });
});

const handleError = (err: Error) => {
    logger.error('APPLICATION_ERROR', { meta: err });
    server.close((error) => {
        if (error) {
            logger.error('Application error', { meta: error });
        }
        process.exit(1);
    });
};

process.on('unhandledRejection', handleError);
process.on('uncaughtException', handleError);
