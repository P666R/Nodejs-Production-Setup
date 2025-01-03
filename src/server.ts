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

const handleError = (error: Error) => {
    logger.error('APPLICATION_ERROR', { meta: error });
    server.close((error) => {
        if (error) {
            logger.error('APPPLICATION_ERROR', { meta: error });
        }
        process.exit(1);
    });
};

process.on('unhandledRejection', handleError);
process.on('uncaughtException', handleError);
