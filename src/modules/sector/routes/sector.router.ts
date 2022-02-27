import { Router } from 'express';
import SearchAllSector from '@modules/sector/services/SearchAllSector.service'
import SearchSectorByName from '@modules/sector/services/searchSectorByName.service'

const routes = Router();

routes.get('/', async (req, res) => {
  const searchAllSector = new SearchAllSector()
  const allSector = await searchAllSector.run()

  res.status(200).json(allSector);
});

routes.get('/:sectorName', async (req, res) => {
  const { sectorName } = req.params
  const searchSectorByName = new SearchSectorByName()
  const sector = await searchSectorByName.run(sectorName)

  res.status(200).json(sector);
});

export default routes