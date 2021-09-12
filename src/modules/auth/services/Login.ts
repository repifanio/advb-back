import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import cognitoConfig from '@modules/auth/config/CognitoConfig';
import CheckToken from '@modules/auth/services/CheckToken';

interface iBodyLogin{
    username: string,
    password: string
}

class Login {
  public async run({ username, password }:iBodyLogin):Promise<string> {
    const checkToken = new CheckToken();

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userData = {
      Username: username,
      Pool: cognitoConfig,
    };

    const cognitoUser = new CognitoUser(userData);

    const prom: Promise<string> = new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
          console.log('Enviado para validação');
          checkToken.run(result.getAccessToken().getJwtToken());
          resolve(`Login efetuado com sucesso! Token: ${result.getAccessToken().getJwtToken()}`);
        },
        onFailure(err) {
          console.log('testeErradi');
          reject(err.message);
        },
      });
    });

    await prom;
    return prom;
  }
}

export default Login;

/**
 *  console.log(`access token + ${result.getAccessToken().getJwtToken()}`);
    console.log(`id token + ${result.getIdToken().getJwtToken()}`);
    console.log(`refresh token + ${result.getRefreshToken().getToken()}`);
 */
