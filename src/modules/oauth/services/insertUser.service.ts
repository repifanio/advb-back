import { getManager } from 'typeorm';
import { iUser } from '@modules/oauth/providers/user.provider';
import bcrypt from 'bcrypt';
import { AppError } from '@/shared/errors/AppError';

class InsertUser {
  public async run(user: iUser):Promise<number> {
    const salt = await bcrypt.genSalt(10);

    if (!user.password) throw new AppError('Password is necessary', 400);
    const newPass = await bcrypt.hash(user.password, salt);

    const query = await getManager().query(`
      INSERT INTO users (name, email, password, job_function, entity, created) VALUES (?, ?, ?, ?, ?, now())
    `, [user.name, user.email, newPass, user.jobFunction, user.entity]);

    return query.insertId;
  }
}

export default InsertUser;
