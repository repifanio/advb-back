import { getManager } from 'typeorm';
import { iContact } from '@modules/company/providers/contact.provider'

class SearchContacts {
  public async run(idCompany: number):Promise<iContact[]>{
    const query: iContact[] = await getManager().query(`select * from company_contacts where company_id = ?`, [idCompany])

    return query
  }
}

export default SearchContacts