import { Router } from 'express';
import SearchAllCompanies from '@modules/company/services/searchAllCompanies.service'
import SearchUniqueCompanies from '@modules/company/services/searchUniqueCompanies.service'
import InsertCompany from '@modules/company/services/insertCompany.service'
import EditCompany from '@modules/company/services/editCompany.service'


const routes = Router();

routes.get('/', async (req, res) => {
  const searchAllCompanies = new SearchAllCompanies()
  const companies = await searchAllCompanies.run()

  res.status(200).json(companies);
});

routes.get('/:idCompany', async (req, res) => {
  const {idCompany} = req.params
  const searchUniqueCompanies = new SearchUniqueCompanies()
  const companies = await searchUniqueCompanies.run(parseInt(idCompany))

  res.status(200).json(companies);
});


routes.post('/', async (req, res) => {
  const insertCompany = new InsertCompany()
  const companyInserted = await insertCompany.run(req.body)
  res.status(200).json({companyId: companyInserted});
});

routes.put('/:idCompany', async (req, res) => {
  const {idCompany} = req.params
  const editCompany = new EditCompany()
  const companyUpdated = await editCompany.run(req.body, parseInt(idCompany))

  res.status(200).json({ message: companyUpdated});
});

routes.get('/:idCompany/contacts', (req, res) => {
  const {idCompany} = req.params
  res.status(200).json({ status: `get contacts of Company id: ${idCompany}`});
});

routes.post('/:idCompany/contacts/', (req, res) => {
  const {idCompany} = req.params
  res.status(200).json({ status: `post contacts of Company id: ${idCompany}`});
});

routes.put('/:idCompany/contacts/:idContact', (req, res) => {
  const {idCompany, idContact} = req.params
  res.status(200).json({ status: `put contact id ${idContact} of Company id: ${idCompany}`});
});

export default routes;
