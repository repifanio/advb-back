import { getManager } from 'typeorm';
import { iIndication } from '@modules/indication/providers/indication.provider'

class editIndication {
  public async run():Promise<void>{
    const query = await getManager().query(``)
  }
}

export default editIndication