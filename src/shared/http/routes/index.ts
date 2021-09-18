import { Router } from 'express';

const routes = Router();

routes.get('/status', (req, res) => {
  res.json({ status: 'Aplicação online 🤯' });
});

export default routes;
