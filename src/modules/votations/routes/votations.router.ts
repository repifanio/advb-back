import { Router } from 'express';
import SearchAllIndicatesBySector from '@modules/votations/services/SearchAllIndicatesBySector.service';
import InsertVotation from '@modules/votations/services/InsertVote.service';
import VerifyIfUserVoteBefore from '@modules/votations/services/VerifyIfUserVoteBefore.service';

const routes = Router();

routes.get('/:idSetor', async (req, res) => {
  try {
    const { idSetor } = req.params;
    const searchAllIndicatesBySector = new SearchAllIndicatesBySector();
    const allIndicates = await searchAllIndicatesBySector.run(parseInt(idSetor, 10));

    res.status(200).json(allIndicates);
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

routes.post('/', async (req, res) => {
  try {
    console.log(req.body);

    const { companyId, sectorId, note } = req.body;
    const insertVotation = new InsertVotation();
    const ret = await insertVotation.run(companyId, req.user.userId, sectorId, parseInt(note, 10));

    res.status(200).json({ message: ret });
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

routes.post('/validate', async (req, res) => {
  try {
    console.log(req.body.data);

    const { companyId, setorId } = req.body.data;

    console.log('sectorId', setorId);

    const verifyIfUserVoteBefore = new VerifyIfUserVoteBefore();
    const ret = await verifyIfUserVoteBefore.run(companyId, req.user.userId, setorId);

    console.log(ret);

    const retorno = ret.length === 0 ? null : ret;

    console.log(retorno);

    res.status(200).json({ data: retorno });
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

export default routes;
