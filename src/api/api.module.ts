import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [AuthModule, UsersModule, CatalogModule],
})
export class ApiModule {}
