import 'dotenv/config';
import app from '@/shared/http/app';
import logger from '../config/logger';

app.listen(process.env.PORT, () => {
  logger.log('info', `💥 Server on in port: ${process.env.PORT}`);
});
