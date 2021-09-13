import request from 'request';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';
import { AttributeType } from 'aws-sdk/clients/elb';

class CheckToken {
  public async run(token: string):Promise<AttributeType[] | string | void> {
    let retorno: AttributeType | any = [];

    const prom: any = new Promise((resolve, reject) => {
      request({
        url: `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
        json: true,
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const pems: any = {};
          const { keys } = body;
          for (let i = 0; i < keys.length; i += 1) {
            // Convert each key to PEM
            const keyId = keys[i].kid;
            const modulus = keys[i].n;
            const exponent = keys[i].e;
            const keyType = keys[i].kty;
            const jwk = { kty: keyType, n: modulus, e: exponent };
            const pem = jwkToPem(jwk);
            pems[keyId] = pem;
          }
          // validate the token
          const decodedJwt = jwt.decode(token, { complete: true });
          if (!decodedJwt) {
            return;
          }

          const { kid = 0 } = decodedJwt.header;
          const pem = pems[kid];
          if (!pem) {
            return;
          }

          jwt.verify(token, pem, (err: any) => {
            if (err) {
              return;
            }

            console.log('Valid Token.');

            const params = {
              AccessToken: token,
            };

            AWS.config.region = process.env.AWS_COGNITO_REGION;
            const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
            cognitoidentityserviceprovider.getUser(params, (erro, data) => {
              if (erro) {
                reject(erro);
              }
              retorno = data.UserAttributes;
              resolve(retorno);
            });
          });
        } else {
          reject(error);
        }
      });
    });

    await prom;
    return prom;
  }
}

export default CheckToken;
