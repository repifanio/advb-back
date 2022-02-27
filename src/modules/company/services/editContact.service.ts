import { getManager } from 'typeorm';
import { iContact } from '@modules/company/providers/contact.provider'

class EditContact {
  public async run(idCompany: number, idContact:number, contact: iContact): Promise<string>{
    const query: iContact[] = await getManager().query(`
      update company_contacts set name=?, email=?, function_service=?, phone=?, updated=now() where company_id = ? and contact_id = ?
    `, [contact.name, contact.email, contact.function_service, contact.phone, idCompany, idContact])

    return 'Edit contact success'
  }
}

export default EditContact