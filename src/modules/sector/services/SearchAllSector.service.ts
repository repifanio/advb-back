import { getManager } from 'typeorm';
import { iSector } from '@modules/sector/provider/sector.provider';

class SearchAllSectors {
  public async run():Promise<iSector[]> {
    const query: iSector[] = await getManager().query('select * from sectors s where s.year = 2023');

    return query;
  }
}

export default SearchAllSectors;
