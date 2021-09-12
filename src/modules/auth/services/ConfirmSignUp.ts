import { CognitoUser } from 'amazon-cognito-identity-js';
import cognitoConfig from '@modules/auth/config/CognitoConfig';

interface iConfimationAccount {
  username: string,
  code: string
}

class ConfirmSignUp {
  public async run({ username, code }: iConfimationAccount):Promise<string> {
    const prom = new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: username,
        Pool: cognitoConfig,
      });

      user.confirmRegistration(code, true, (err: any, result: any) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log(result);
        resolve(result);
      });
    });

    await prom;
    return 'Usuário Ativado';
  }
}

export default ConfirmSignUp;
