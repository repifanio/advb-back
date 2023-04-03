import { getManager } from 'typeorm';
import { iCompany } from '@modules/company/providers/company.provider';

class SearchAllCompaniesToIndicate {
  public async run(idSetor: number, idUser: number): Promise<iCompany[]> {
    const query:iCompany[] = await getManager().query(`
      select * from companies c where c.year = 2023 and c.company_id not in (select company_id from indicates i where sector_id = ? and user_id = ?) order by c.name ASC
    `, [idSetor, idUser]);

    return query;
  }
}

export default SearchAllCompaniesToIndicate;
