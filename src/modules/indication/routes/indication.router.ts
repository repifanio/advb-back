import { Router } from 'express';

const routes = Router();

routes.get('/', async (req, res) => {
  res.status(200).json({indication: 'ok'});
});

routes.get('/:idIndication', async (req, res) => {
  const { idIndication } = req.params
  res.status(200).json({indication: 'ok'});
});

routes.post('/', async (req, res) => {
  res.status(200).json({indication: 'ok'});
});

routes.put('/:idIndication', async (req, res) => {
  const { idIndication } = req.params
  res.status(200).json({indication: 'ok'});
});

export default routes