import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { environments } from './environments';
import { DatabaseModule } from './database/database.module';
import { LibModule } from './lib/lib.module';
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
    LibModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
