import { getManager } from 'typeorm';
import { iIndication } from '@modules/indication/providers/indication.provider';

class SearchAllIndication {
  public async run(idCompany: number):Promise<iIndication[]> {
    const query: iIndication[] = await getManager().query('select * from indicates where company_id = ? order by description ASC', [idCompany]);

    return query;
  }
}

export default SearchAllIndication;
