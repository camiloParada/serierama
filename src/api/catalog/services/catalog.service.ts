import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateMovieRatingDto,
  UpdateMovieRatingDto,
} from '../dtos/movie-rating.dto';
import {
  CreateMovieFavoriteDto,
  UpdateMovieFavoriteDto,
} from '../dtos/movie-favorite.dto';
import { CreateMovieNoteDto, UpdateMovieNoteDto } from '../dtos/movie-note.dto';
import { MovieFavorite } from '../entities/movie-favorite.entity';
import { MovieRating } from '../entities/movie-rating.entity';
import { MovieNote } from '../entities/movie-note.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(MovieRating)
    private movieRatingRepo: Repository<MovieRating>,
    @InjectRepository(MovieFavorite)
    private movieFavoriteRepo: Repository<MovieFavorite>,
    @InjectRepository(MovieNote)
    private movieNoteRepo: Repository<MovieNote>,
  ) {}

  findMovie(search: string) {
    return search;
  }

  rateMovie(data: CreateMovieRatingDto) {
    return data;
  }

  likeMovie(data: CreateMovieFavoriteDto) {
    return data;
  }

  writeNoteAboutMovie(data: CreateMovieNoteDto) {
    return data;
  }

  updateLikeMovie(id: number, changes: UpdateMovieFavoriteDto) {
    return changes;
  }

  updateRateMovie(id: number, changes: UpdateMovieRatingDto) {
    return changes;
  }

  updateNoteAboutMovie(id: number, changes: UpdateMovieNoteDto) {
    return changes;
  }
}
