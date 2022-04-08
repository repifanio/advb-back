/* eslint-disable max-len */
import { Router } from 'express';
import SearchAllCompanies from '@modules/company/services/searchAllCompanies.service';
import SearchAllCompaniesToIndicate from '@modules/company/services/searchAllCompaniesToIndicate.service';
import SearchUniqueCompanies from '@modules/company/services/searchUniqueCompanies.service';
import InsertCompany from '@modules/company/services/insertCompany.service';
import EditCompany from '@modules/company/services/editCompany.service';
import SearchContacts from '@modules/company/services/searchContacts.service';
import InsertContact from '@modules/company/services/insertContact.service';
import EditContact from '@modules/company/services/editContact.service';

const routes = Router();

routes.get('/', async (req, res) => {
  try {
    const searchAllCompanies = new SearchAllCompanies();
    const companies = await searchAllCompanies.run();

    res.status(200).json(companies);
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

routes.get('/companyIndication/:idSetor', async (req, res) => {
  try {
    const { idSetor } = req.params;

    const searchAllCompaniesToIndicate = new SearchAllCompaniesToIndicate();
    const companies = await searchAllCompaniesToIndicate.run(parseInt(idSetor, 10), req.user.userId);

    res.status(200).json(companies);
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

routes.get('/:idCompany', async (req, res) => {
  try {
    const { idCompany } = req.params;
    const searchUniqueCompanies = new SearchUniqueCompanies();
    const companies = await searchUniqueCompanies.run(parseInt(idCompany, 10));

    res.status(200).json(companies);
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

routes.post('/', async (req, res) => {
  try {
    const insertCompany = new InsertCompany();
    const companyInserted = await insertCompany.run(req.body);

    res.status(200).json({ companyId: companyInserted });
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

routes.put('/:idCompany', async (req, res) => {
  try {
    const { idCompany } = req.params;
    const editCompany = new EditCompany();
    const companyUpdated = await editCompany.run(req.body, parseInt(idCompany, 10));

    res.status(200).json({ message: companyUpdated });
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

routes.get('/:idCompany/contacts', async (req, res) => {
  try {
    const { idCompany } = req.params;
    const searchContacts = new SearchContacts();
    const allContacts = await searchContacts.run(parseInt(idCompany, 10));

    res.status(200).json(allContacts);
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

routes.post('/:idCompany/contacts/', async (req, res) => {
  try {
    const { idCompany } = req.params;
    const insertContact = new InsertContact();
    const insertedContact = await insertContact.run(parseInt(idCompany, 10), req.body);

    res.status(200).json({ contactId: insertedContact });
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

routes.put('/:idCompany/contacts/:idContact', async (req, res) => {
  try {
    const { idCompany, idContact } = req.params;
    const editContact = new EditContact();
    const contactUpdated = await editContact.run(parseInt(idCompany, 10), parseInt(idContact, 10), req.body);

    res.status(200).json({ message: contactUpdated });
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

export default routes;
