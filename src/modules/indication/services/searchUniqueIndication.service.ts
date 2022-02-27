import { getManager } from 'typeorm';
import { iIndication } from '@modules/indication/providers/indication.provider'

class SearchUniqueIndication {
  public async run(idCompany: number, idIndication: number):Promise<iIndication[]>{
    const query: iIndication[] = await getManager().query(`select * from indicates where company_id = ? and indicate_id = ?`, [idCompany, idIndication])

    return query
  }
}

export default SearchUniqueIndication