import { getManager } from 'typeorm';
import { iIndication } from '@modules/indication/providers/indication.provider'

class SearchUniqueIndication {
  public async run():Promise<void>{
    const query = await getManager().query(``)
  }
}

export default SearchUniqueIndication