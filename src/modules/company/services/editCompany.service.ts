import { getManager } from 'typeorm';
import { iCompany } from '@modules/company/providers/company.provider'

class EditCompany {
  public async run(company: iCompany, idCompany: number):Promise<string>{
    const query = await getManager().query(`update companies set name = ?, document = ?, address = ?, updated = now() where company_id = ?`, [company.name, company.document, company.address, idCompany])
  
    return 'Edit company success'
  }
}

export default EditCompany