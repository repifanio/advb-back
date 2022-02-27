import { Router } from 'express';
import SearchAllIndications from '@modules/indication/services/searchAllIndication.service'
import SearshUniqueIndication from '@modules/indication/services/searchUniqueIndication.service'
import InsertIndication from '@modules/indication/services/insertIndication.service'
import EditIndication from '@modules/indication/services/editIndication.service';

const routes = Router();

routes.get('/company/:idCompany', async (req, res) => {
  const { idCompany } = req.params
  const searchAllIndications = new SearchAllIndications()
  searchAllIndications.run(parseInt(idCompany))
  
  res.status(200).json(searchAllIndications);
});

routes.get('/:idIndication/company/:idCompany', async (req, res) => {
  const { idIndication, idCompany } = req.params
  const searshUniqueIndication = new SearshUniqueIndication()
  const indication = await searshUniqueIndication.run(parseInt(idCompany), parseInt(idIndication))

  res.status(200).json(indication);
});

routes.post('/company/:idCompany', async (req, res) => {
  const { idCompany } = req.params
  const insertIndication = new InsertIndication()
  const indicate = await insertIndication.run(parseInt(idCompany), req.body)
  res.status(200).json({indicateId: indicate});
});

routes.put('/:idIndication', async (req, res) => {
  const { idIndication } = req.params
  const editIndication = new EditIndication()
  const indicationUpdated = await editIndication.run(parseInt(idIndication), req.body)
  
  res.status(200).json({ message: indicationUpdated});
});

export default routes