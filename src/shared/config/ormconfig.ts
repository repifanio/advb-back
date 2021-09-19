import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'sampleDb',
  entities: ['./{src,dist}/modules/**/entities/*{.ts,.js}'],
  migrationsRun: false,
  logging: true,
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/typeorm/migrations/',
  },
};

export default config;
