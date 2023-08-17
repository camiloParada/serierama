import { DataSource } from 'typeorm';
import { config } from 'dotenv';

export const connectionSource = new DataSource({
  type: 'mysql',
  username: config().parsed.TYPEORM_USERNAME,
  password: config().parsed.TYPEORM_PASSWORD,
  database: config().parsed.TYPEORM_DATABASE,
  port: +config().parsed.TYPEORM_PORT,
  host: config().parsed.TYPEORM_HOST,
  synchronize: !!config().parsed.TYPEORM_SYNCHRONIZE,
  logging: !!config().parsed.TYPEORM_LOGGING,
  entities: [config().parsed.TYPEORM_ENTITIES],
  migrations: [config().parsed.TYPEORM_MIGRATIONS],
});
