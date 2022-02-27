import { getManager } from 'typeorm';
import { iContact } from '@modules/company/providers/contact.provider'

class insertContact {
  public async run(idCompany: number, contact: iContact):Promise<number>{
    const query = await getManager().query(`
      INSERT INTO company_contacts (company_id, name, email, function_service, phone, created) VALUES (?, ?, ?, ?, ?, now())   
   `, [idCompany, contact.name, contact.email, contact.function_service, contact.phone])

    return query.insertId
  }
}

export default insertContact