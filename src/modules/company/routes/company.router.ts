import { Router } from 'express';
import SearchAllCompanies from '@modules/company/services/searchAllCompanies.service'
import SearchUniqueCompanies from '@modules/company/services/searchUniqueCompanies.service'
import InsertCompany from '@modules/company/services/insertCompany.service'
import EditCompany from '@modules/company/services/editCompany.service'
import SearchContacts from '@modules/company/services/searchContacts.service'
import InsertContact from '@modules/company/services/insertContact.service'
import EditContact from '@modules/company/services/editContact.service'


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

routes.get('/:idCompany/contacts', async (req, res) => {
  const {idCompany} = req.params
  const searchContacts = new SearchContacts()
  const allContacts = await searchContacts.run(parseInt(idCompany))

  res.status(200).json(allContacts);
});

routes.post('/:idCompany/contacts/', async (req, res) => {
  const {idCompany} = req.params
  const insertContact = new InsertContact()
  const insertedContact = await insertContact.run(parseInt(idCompany), req.body)

  res.status(200).json({contactId: insertedContact});
});

routes.put('/:idCompany/contacts/:idContact', async (req, res) => {
  const {idCompany, idContact} = req.params
  const editContact = new EditContact()
  const contactUpdated = await editContact.run(parseInt(idCompany), parseInt(idContact), req.body)
  res.status(200).json({ message: contactUpdated});
});

export default routes;
