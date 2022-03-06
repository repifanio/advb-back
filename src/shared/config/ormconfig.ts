import { ConnectionOptions } from 'typeorm';
import dataBase from 'dotenv';

dataBase.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DBHOST,
  port: Number(process.env.DBPORT),
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  // entities: ['./{src,dist}/modules/**/entities/*{.ts,.js}'],
  // migrationsRun: false,
  // logging: true,
  // migrations: ['./src/shared/typeorm/migrations/*.ts'],
  // cli: {
  //   migrationsDir: './src/shared/typeorm/migrations/',
  // },
};

export default config;
