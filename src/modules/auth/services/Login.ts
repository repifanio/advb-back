import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import cognitoConfig from '@modules/auth/config/CognitoConfig';
import CheckToken from '@modules/auth/services/CheckToken';

interface iBodyLogin{
    username: string,
    password: string
}

interface iUser{
  name?:string,
  email?: string,
  phoneNumber?: string,
  birthDate?: string
}

interface iLoginSucess {
  isLogged: boolean,
  message: string
  token?:string,
  userInfos?: iUser
}

class Login {
  public async run({ username, password }:iBodyLogin):Promise<string | iLoginSucess> {
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

    const prom: Promise<iLoginSucess> = new Promise((resolve) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
          resolve({
            isLogged: true,
            message: 'Loggin ok',
            token: result.getAccessToken().getJwtToken(),
          });
        },
        onFailure(err) {
          resolve({
            isLogged: false,
            message: err.message,
          });
        },
      });
    });

    const loginCheck = await prom;
    if (loginCheck.isLogged) {
      const checkTokenReturn: any = await checkToken.run(loginCheck.token as string);

      if (checkTokenReturn.length > 0) {
        let name;
        let birthDate;
        let email;
        let phoneNumber;
        checkTokenReturn.forEach((element: any) => {
          switch (element.Name) {
            case 'name':
              name = element.Value;
              break;

            case 'birthdate':
              birthDate = element.Value;
              break;

            case 'email':
              email = element.Value;
              break;

            case 'phone_number':
              phoneNumber = element.Value;
              break;

            default:
          }
        });

        const userSearched: iUser = {
          name,
          birthDate,
          email,
          phoneNumber,
        };

        loginCheck.userInfos = userSearched;
      }
    }

    return loginCheck;
  }
}

export default Login;
