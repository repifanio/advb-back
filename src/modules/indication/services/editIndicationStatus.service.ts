import { getManager } from 'typeorm';
import { iIndication } from '@modules/indication/providers/indication.provider';

class editIndicationStatus {
  public async run(idIndicate: number, status: string):Promise<string> {
    await getManager().query(`
      UPDATE indicates SET status=?, updated=now() WHERE indicate_id = ?
    `, [status, idIndicate]);

    return 'Edit indicate success';
  }
}

export default editIndicationStatus;
