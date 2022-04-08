import { Router } from 'express';
import company from '@modules/company/routes/company.router';
import indication from '@modules/indication/routes/indication.router';
import sector from '@modules/sector/routes/sector.router';
import users from '@modules/oauth/routes/oauth.router';
import authMid from '@shared/http/middleware/oauth.middleware';

const routes = Router();

routes.get('/status', (req, res) => {
  res.status(200).json({ status: 'Aplicação online 🤯' });
});

routes.use('/user', users);
// routes.use(authMid);
routes.use('/company', authMid, company);
routes.use('/indication', indication);
routes.use('/sector', sector);
routes.use('/user', users);

export default routes;
