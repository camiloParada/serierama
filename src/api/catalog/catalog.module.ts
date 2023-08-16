import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatalogController } from './controllers/catalog.controller';
import { CatalogService } from './services/catalog.service';
import { MovieRating } from './entities/movie-rating.entity';
import { MovieFavorite } from './entities/movie-favorite.entity';
import { MovieNote } from './entities/movie-note.entity';

@Module({
  controllers: [CatalogController],
  imports: [TypeOrmModule.forFeature([MovieRating, MovieFavorite, MovieNote])],
  providers: [CatalogService],
})
export class CatalogModule {}
