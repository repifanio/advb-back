import { getManager } from 'typeorm';
import { iIndication } from '@modules/indication/providers/indication.provider';

class SearchAllIndicationByUser {
  public async run(idUser: number):Promise<iIndication[]> {
    const query: iIndication[] = await getManager().query(`
          select i.indicate_id as id,
            i.status as status,
            s.name as sectot,
            c.name as company,
            i.description as description
      from indicates i,
          companies c,
          sectors s
      where c.company_id = i.company_id
        and s.sector_id = i.sector_id
        and i.user_id = ?
        and i.year = 2023
    `, [idUser]);

    return query;
  }
}

export default SearchAllIndicationByUser;
