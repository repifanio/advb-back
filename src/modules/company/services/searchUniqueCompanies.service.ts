import { getManager } from 'typeorm';
import { iCompany } from '@modules/company/providers/company.provider'

class SearchUniqueCompanies {
  public async run(idCompany: number):Promise<iCompany[]>{
    const query: iCompany[] = await getManager().query(`select * from companies c where c.company_id = ?`, [idCompany])

    return query
  }
}

export default SearchUniqueCompanies