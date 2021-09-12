import { Router } from 'express';
import authRouter from '@modules/auth/routes/auth.router';

const routes = Router();

routes.get('/status', (req, res) => {
  res.json({ status: 'Aplicação online' });
});

routes.use('/auth', authRouter);

export default routes;
