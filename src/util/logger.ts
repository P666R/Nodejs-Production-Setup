import util from 'util';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import { red, blue, yellow, green, magenta } from 'colorette';
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import * as sourceMapSupport from 'source-map-support';

// Linking trace support
sourceMapSupport.install();

const colorizeLevel = (level: string): string => {
    const colors: Record<string, (text: string) => string> = {
        ERROR: red,
        INFO: blue,
        WARN: yellow
    };
    return (colors[level] || ((text: string) => text))(level);
};

const consoleLogFormat = format.printf(({ level, message, timestamp, meta = {} }) => {
    const customLog = `${colorizeLevel(level.toUpperCase())} [${green(timestamp as string)}] ${message as string}\n${magenta('META')} ${util.inspect(meta, { showHidden: false, depth: null, colors: true })}\n`;
    return customLog;
});

const consoleTransport = (): ConsoleTransportInstance[] =>
    config.ENV === EApplicationEnvironment.DEVELOPMENT
        ? [
              new transports.Console({
                  level: 'info',
                  format: format.combine(format.timestamp(), consoleLogFormat)
              })
          ]
        : [];

const fileLogFormat = format.printf(({ level, message, timestamp, meta = {} }) => {
    const logMeta = Object.entries(meta as object).reduce(
        (acc, [key, value]) => {
            acc[key] = value instanceof Error ? { name: value.name, message: value.message, trace: value.stack ?? '' } : value;
            return acc;
        },
        {} as Record<string, unknown>
    );

    return JSON.stringify({ level: level.toUpperCase(), message, timestamp, meta: logMeta }, null, 4);
});

const FileTransport = (): FileTransportInstance[] => [
    new transports.File({
        filename: path.join(__dirname, '..', '..', 'logs', `${config.ENV}.log`),
        level: 'info',
        format: format.combine(format.timestamp(), fileLogFormat)
    })
];

export default createLogger({
    defaultMeta: { meta: {} },
    transports: [...FileTransport(), ...consoleTransport()]
});
