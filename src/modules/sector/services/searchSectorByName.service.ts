import { getManager } from 'typeorm';
import { iSector } from '@modules/sector/provider/sector.provider'

class SearchSectorByName {
  public async run(nameSector: string):Promise<iSector[]>{
    const query: iSector[] = await getManager().query(`select * from sectors where name like ?`, [`%${nameSector}%`])

    return query
  }
}

export default SearchSectorByName