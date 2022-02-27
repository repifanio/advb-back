import { getManager } from 'typeorm';
import { iIndication } from '@modules/indication/providers/indication.provider'

class editIndication {
  public async run(idIndicate: number, indicate: iIndication):Promise<string>{
    const query = await getManager().query(`
      UPDATE indicates SET description=?, sector_id=?, updated=now() WHERE indicate_id = ?
    `, [indicate.description, indicate.sectorId, idIndicate])

    return 'Edit indicate success'
  }
}

export default editIndication