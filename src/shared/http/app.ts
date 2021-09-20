import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerConf from '@shared/config/swagger.json';
import exceptionCapture from '@shared/http/middleware/exceptionCapture';
import { createConnection } from 'typeorm';
import config from '@shared/config/ormconfig';
import routes from '@shared/http/routes';
import logger from '../config/logger';

createConnection(config)
  .then(async (connection) => {
    logger.log('info', `🌀 Conectado: ${connection.isConnected}`);
  })
  .catch((error) => logger.log('error', error.message));

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConf));
app.use(routes);
app.use(exceptionCapture);

export default app;
