import { CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';
import cognitoConfig from '@modules/auth/config/CognitoConfig';

interface iUser {
    name: string
    birthdate: string,
    email: string,
    phoneNumber: string,
    password: string
}

class UpdateUser {
  public async run({
    name, birthdate, email, phoneNumber, password,
  }: iUser): Promise<string> {
    const authenticationDetails = new AuthenticationDetails({
      Username: phoneNumber,
      Password: password,
    });

    const attributeList: any = [];
    attributeList.push(new CognitoUserAttribute({ Name: 'name', Value: name }));
    attributeList.push(new CognitoUserAttribute({ Name: 'birthdate', Value: birthdate }));
    attributeList.push(new CognitoUserAttribute({ Name: 'email', Value: email }));
    attributeList.push(new CognitoUserAttribute({ Name: 'phone_number', Value: phoneNumber }));

    const userData = {
      Username: phoneNumber,
      Pool: cognitoConfig,
    };

    const prom = new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
          cognitoUser.updateAttributes(attributeList, (err, resultLogin) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(resultLogin);
            }
          });
          resolve(`Login efetuado com sucesso! Token: ${result.getAccessToken().getJwtToken()}`);
        },
        onFailure(err) {
          console.log('testeErradi');
          reject(err.message);
        },
      });
    });

    await prom;
    return 'Dados atualizados';
  }
}

export default UpdateUser;
