import { getManager } from 'typeorm';
import { iCompany } from '@modules/company/providers/company.provider';

class SearchAllCompaniesToIndicate {
  public async run(idSetor: number): Promise<iCompany[]> {
    const query:iCompany[] = await getManager().query(`
      select * from companies c where c.company_id not in (select company_id from indicates i where sector_id = ?)
    `, [idSetor]);

    console.log(query);

    return query;
  }
}

export default SearchAllCompaniesToIndicate;
