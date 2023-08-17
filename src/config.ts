import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      host: process.env.TYPEORM_HOST,
      dbName: process.env.TYPEORM_DATABASE,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      user: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      entities: process.env.TYPEORM_ENTITIES,
      migrations: process.env.TYPEORM_MIGRATIONS,
      migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      usernameField: process.env.JWT_USERNAME_FIELD,
      passwordField: process.env.JWT_PASSWORD_FIELD,
    },
    tmdb: {
      apiKey: process.env.TMBD_API_KEY,
    },
  };
});
