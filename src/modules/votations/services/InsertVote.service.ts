/* eslint-disable max-len */
import { getManager } from 'typeorm';

class InsertVote {
  public async run(companyId: number, userId: number, sectorId: number, note: number):Promise<string> {
    await getManager().query(`
    Insert INTO votations (company_id, user_id, sector_id, note, created) VALUES (?, ?, ?, ?, now())
  `, [companyId, userId, sectorId, note]);

    return 'Voto computado com sucesso!';
  }
}

export default InsertVote;
