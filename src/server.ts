/* eslint-disable no-console */
import app from './app';
import config from './config/config';

const server = app.listen(config.PORT);

// eslint-disable-next-line @typescript-eslint/require-await
void (async () => {
    try {
        console.info('Application started', {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        });
    } catch (err) {
        console.error('Application error', { meta: err });

        server.close((error) => {
            if (error) {
                console.error('Application error', { meta: error });
            }
            process.exit(1);
        });
    }
})();
