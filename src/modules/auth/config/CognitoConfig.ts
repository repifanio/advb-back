import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_tmI5bo74h', // Your user pool id here
  ClientId: '3gp0lcs6oatgdbe8ojadehscq8', // Your client id here
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
