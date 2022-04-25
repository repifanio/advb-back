import { getManager } from 'typeorm';
import { iIndicates } from '@modules/votations/provider/indicates.provider';

class SearchAllIndicatesBySector {
  public async run(sectorId: number):Promise<iIndicates[]> {
    const query: iIndicates[] = await getManager().query(`
    SELECT i.indicate_id AS indicateId, i.description, c.company_id AS companyId, c.name FROM indicates i, companies c WHERE i.company_id = c.company_id and i.open_to_vote = true and i.sector_id = ? and c.accepted_to_vote = true;
  `, [sectorId]);

    return query;
  }
}

export default SearchAllIndicatesBySector;
