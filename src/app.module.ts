import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { environments } from './environments';
import config from './config';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        TYPEORM_HOST: Joi.string().required(),
        TYPEORM_DATABASE: Joi.string().required(),
        TYPEORM_PORT: Joi.number().required(),
        TYPEORM_USERNAME: Joi.string().required(),
        TYPEORM_PASSWORD: Joi.string().required(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
