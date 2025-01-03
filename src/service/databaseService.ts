import mongoose from 'mongoose';
import config from '../config/config';

export default {
    connect: async (): Promise<typeof mongoose.connection> => {
        await mongoose.connect(config.DATABASE_URL as string);
        return mongoose.connection;
    }
};
