import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TmdbService } from './services/tmdb.service';

@Module({
  exports: [TmdbService],
  imports: [HttpModule],
  providers: [TmdbService],
})
export class TmdbModule {}
