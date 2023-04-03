/* eslint-disable max-len */
import { getManager } from 'typeorm';
import { iLogin, iUserLogged } from '@modules/oauth/providers/user.provider';
import bcrypt from 'bcrypt';
import { AppError } from '@shared/errors/AppError';
import jwt from 'jsonwebtoken';

class LoginService {
  public async run(login: iLogin):Promise<iUserLogged> {
    const query = await getManager().query(`
      SELECT * from users u where u.email = ? and u.is_active = ?
    `, [login.email, true]);

    console.log('tete')

    if (query.length < 1) throw new AppError('Usuário ou senha incorretos', 401);

    const validPassword = await bcrypt.compare(login.password, query[0].password);
    if (!validPassword) throw new AppError('Usuário ou senha incorretos', 401);

    const ret = {
      user: {
        id: query[0].user_id,
        name: query[0].name,
        email: query[0].email,
        jobFunction: query[0].job_function,
        entity: query[0].entity,
      },
      token: jwt.sign({ id: query[0].user_id }, process.env.TOKEN_SECRET as string, { expiresIn: process.env.TOKEN_EXPIRE }),
    };

    return ret;
  }
}

export default LoginService;
