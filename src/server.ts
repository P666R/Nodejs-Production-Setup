import app from './app';
import config from './config/config';
import logger from './util/logger';
import databaseService from './service/databaseService';

let server: ReturnType<typeof app.listen>;

const startServer = () => {
    try {
        server = app.listen(config.PORT, () => {
            logger.info('APPLICATION_STARTED', {
                meta: {
                    PORT: config.PORT,
                    SERVER_URL: config.SERVER_URL
                }
            });
        });
    } catch (error) {
        handleError(error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const handleError = (err: Error | unknown) => {
    logger.error('APPLICATION_ERROR', { meta: err });
    if (server) {
        server.close((error) => {
            if (error) {
                logger.error('APPLICATION_ERROR', { meta: error });
            }
            logger.info('APPLICATION_SHUTDOWN', { reason: 'Error occurred' });
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const connectDatabaseAndStartServer = async () => {
    const maxRetries = 3;
    let attempts = 0;
    while (attempts < maxRetries) {
        try {
            const connection = await databaseService.connect();
            logger.info('DATABASE_STARTED', {
                meta: {
                    CONNECTION_NAME: connection.name
                }
            });
            startServer();
            return;
        } catch (error) {
            attempts++;
            if (attempts >= maxRetries) {
                handleError(error);
            } else {
                logger.warn('DATABASE_CONNECTION_RETRY', { attempt: attempts });
            }
        }
    }
};

process.on('unhandledRejection', handleError);
process.on('uncaughtException', handleError);

void connectDatabaseAndStartServer();
