import { Router } from 'express';
import InsertUser from '@modules/oauth/services/insertUser.service';
import LoginUser from '@modules/oauth/services/login.service';

const routes = Router();

routes.post('/', async (req, res) => {
  try {
    const insertUser = new InsertUser();
    const user = await insertUser.run(req.body);

    res.status(200).json({ user });
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(400).json({ message: err.message });
  }
});

routes.post('/login', async (req, res) => {
  try {
    const loginUser = new LoginUser();
    const login = await loginUser.run(req.body);

    res.status(200).json(login);
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({ message: err.message });
  }
});

export default routes;
