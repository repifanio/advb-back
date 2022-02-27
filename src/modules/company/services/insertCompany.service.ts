import { getManager } from 'typeorm';
import { iCompany } from '@modules/company/providers/company.provider'

class InsertCompany {
  public async run(company: iCompany): Promise<number> {
    const query = await getManager().query(`INSERT INTO companies (name, document, address, created, user_id) VALUES (?, ?, ?, now(), ?)`, [company.name, company.document, company.address, company.userId])

    return query.insertId
  }
}

export default InsertCompany