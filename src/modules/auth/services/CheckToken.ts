import request from 'request';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';

class CheckToken {
  public async run(token: string) {
    request({
      url: `https://cognito-idp.${'us-east-1'}.amazonaws.com/${'us-east-1_tmI5bo74h'}/.well-known/jwks.json`,
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
          console.log('Not a valid JWT token');
          return;
        }

        const { kid = 0 } = decodedJwt.header;
        const pem = pems[kid];
        if (!pem) {
          console.log('Invalid token');
          return;
        }

        jwt.verify(token, pem, (err: any, payload: any) => {
          if (err) {
            console.log('Invalid Token.');
          } else {
            console.log('Valid Token.');
            console.log(payload);

            // const
          }
        });
      } else {
        console.log('Error! Unable to download JWKs');
      }
    });
  }
}

export default CheckToken;
