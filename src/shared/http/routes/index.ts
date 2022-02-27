import { Router } from 'express';
import company from '@modules/company/routes/company.router'

const routes = Router();

routes.use('/company', company)

routes.get('/status', (req, res) => {
  res.status(200).json({ status: 'Aplicação online 🤯' });
});

export default routes;
