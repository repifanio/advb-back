import { Router } from 'express';
import SearchAllSector from '@modules/sector/services/SearchAllSector.service';
import SearchSectorByName from '@modules/sector/services/searchSectorByName.service';

const routes = Router();

routes.get('/', async (req, res) => {
  try {
    const searchAllSector = new SearchAllSector();
    const allSector = await searchAllSector.run();

    res.status(200).json(allSector);
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

routes.get('/:sectorName', async (req, res) => {
  try {
    const { sectorName } = req.params;
    const searchSectorByName = new SearchSectorByName();
    const sector = await searchSectorByName.run(sectorName);

    res.status(200).json(sector);
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

export default routes;
