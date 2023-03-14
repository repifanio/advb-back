import { getManager } from 'typeorm';
import { iIndication } from '@modules/indication/providers/indication.provider';

class editIndication {
  public async run(idIndicate: number, indicate: iIndication):Promise<string> {
    await getManager().query(`
      UPDATE indicates SET description=?, updated=now() WHERE indicate_id = ?
    `, [indicate.description, idIndicate]);

    return 'Edit indicate success';
  }
}

export default editIndication;
