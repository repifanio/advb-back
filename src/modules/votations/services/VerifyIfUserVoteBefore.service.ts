import { getManager } from 'typeorm';
import { iIndicates } from '@modules/votations/provider/indicates.provider';

class VerifyIfUserVoteBefore {
  public async run(companyId: number, userId: number, sectorId: number):Promise<iIndicates[]> {
    console.log(sectorId);

    const query: iIndicates[] = await getManager().query(`
    SELECT * FROM votations v WHERE v.company_id = ? and v.user_id = ? and v.sector_id = ?;
  `, [companyId, userId, sectorId]);

    return query;
  }
}

export default VerifyIfUserVoteBefore;
