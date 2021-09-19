import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerConf from '@shared/config/swagger.json';
import exceptionCapture from '@shared/http/middleware/exceptionCapture';
import { createConnection } from 'typeorm';
import config from '@shared/config/ormconfig';
import routes from '@/shared/http/routes';

createConnection(config)
  .then(async (connection) => {
    console.log(`Conectado: ${connection.isConnected}`);
  })
  .catch((error) => console.log(error));

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConf));
app.use(routes);
app.use(exceptionCapture);

export default app;
