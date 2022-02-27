import { getManager } from 'typeorm';
import { iIndication } from '@modules/indication/providers/indication.provider'

class InsertIndication {
  public async run(idCompany: number, indicate: iIndication):Promise<number>{
    const query = await getManager().query(`
      INSERT INTO indicates (company_id, sector_id, description, user_id, created) VALUES (?, ?, ?, ?, now())
    `, [idCompany, indicate.sectorId, indicate.description, indicate.userId])

    return query.insertId
  }
}

export default InsertIndication