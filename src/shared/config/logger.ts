import { createLogger, transports, format } from 'winston';
import 'winston-mongodb';

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.simple()),
    }),

    // new transports.MongoDB({
    //   level: 'error',
    //   db: process.env.MONGO_URL as string,
    //   options: { useUnifiedTopology: true },
    //   collection: 'errorLogs',
    // }),
  ],
});

export default logger;
