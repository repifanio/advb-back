import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerConf from '@shared/config/swagger.json';
import routes from '@/shared/http/routes';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConf));
app.use(routes);

export default app;
