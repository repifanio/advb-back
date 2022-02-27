import { getManager } from 'typeorm';
import { iCompany } from '@modules/company/providers/company.provider'

class SearchAllCompanies {
  public async run():Promise<iCompany[]>{
    const query:iCompany[] = await getManager().query(`select * from companies c`)

    return query
  }
}

export default SearchAllCompanies