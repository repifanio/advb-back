import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import cognitoConfig from '@modules/auth/config/CognitoConfig';

interface iUser {
    name: string
    birthdate: string,
    email: string,
    phoneNumber: string,
    password: string
}

class SignUpService {
  public async run({
    name, birthdate, email, phoneNumber, password,
  }: iUser):Promise<string> {
    const attTemp: any[] = [];
    attTemp.push(new CognitoUserAttribute({ Name: 'name', Value: 'Teste' }));
    const attributeList: any = [];
    attributeList.push(new CognitoUserAttribute({ Name: 'name', Value: name }));
    attributeList.push(new CognitoUserAttribute({ Name: 'birthdate', Value: birthdate }));
    attributeList.push(new CognitoUserAttribute({ Name: 'email', Value: email }));
    attributeList.push(new CognitoUserAttribute({ Name: 'phone_number', Value: phoneNumber }));

    const prom:Promise<string> = new Promise((resolve, reject) => {
      cognitoConfig.signUp(
        phoneNumber,
        password,
        attributeList,
        attTemp,
        (err, result) => {
          if (err) {
            console.log(err.message);
            reject(err.message);
          }
          const cognitoUser = result?.user;
          resolve(`Usuário criado com sucesso. Username: ${cognitoUser?.getUsername()} `);
        },
      );
    });

    await prom;
    return prom;
  }
}

export default SignUpService;
