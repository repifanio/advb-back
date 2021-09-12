import { Router } from 'express';
import SignUp from '@modules/auth/services/SignUp';
import ConfirmSignUp from '@modules/auth/services/ConfirmSignUp';
import Login from '@modules/auth/services/Login';
import UpdateUser from '@modules/auth/services/UpdateUser';

const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
  const signUp = new SignUp();
  const retorno = await signUp.run(req.body);

  return res.json({ message: retorno });
});

authRouter.post('/confirm', async (req, res) => {
  const confirmSignUp = new ConfirmSignUp();
  const retorno = await confirmSignUp.run(req.body);

  return res.json({ message: retorno });
});

authRouter.post('/login', async (req, res) => {
  const login = new Login();
  const retorno = await login.run(req.body);
  return res.json({ message: retorno });
});

authRouter.post('/update', async (req, res) => {
  const updateUser = new UpdateUser();
  await updateUser.run(req.body);

  return res.json({ Message: 'Update Ok' });
});

export default authRouter;
