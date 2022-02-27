import { Router } from 'express';
import company from '@modules/company/routes/company.router'
import indication from '@modules/indication/routes/indication.router'
import sector from '@modules/sector/routes/sector.router'

const routes = Router();

routes.use('/company', company)
routes.use('/indication', indication)
routes.use('/sector', sector)

routes.get('/status', (req, res) => {
  res.status(200).json({ status: 'Aplicação online 🤯' });
});

export default routes;
