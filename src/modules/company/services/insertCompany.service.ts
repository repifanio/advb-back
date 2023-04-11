import { getManager } from 'typeorm';
import { iCompany } from '@modules/company/providers/company.provider'

class InsertCompany {
  public async run(company: iCompany): Promise<number> {
    try {
      const query = await getManager().query(`INSERT INTO companies (name, document, address, created, user_id, year) VALUES (?, ?, ?, now(), ?, 2023)`, [company.name, company.document, company.address, company.userId])
    
      const queryContact = await getManager().query(`
      INSERT INTO company_contacts (company_id, name, email, function_service, phone, created) VALUES (?, ?, ?, ?, ?, now())   
   `, [query.insertId, company.contact, company.email, company.function, company.phone])


    return query.insertId
    }
    catch (err) {
      console.log(err)
      return 0
    }

    

  }
}

export default InsertCompany