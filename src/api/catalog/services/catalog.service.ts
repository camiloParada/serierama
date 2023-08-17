import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateMovieRatingDto,
  UpdateMovieRatingDto,
} from '../dtos/movie-rating.dto';
import { CreateMovieFavoriteDto } from '../dtos/movie-favorite.dto';
import { CreateMovieNoteDto, UpdateMovieNoteDto } from '../dtos/movie-note.dto';
import { MovieFavorite } from '../entities/movie-favorite.entity';
import { MovieRating } from '../entities/movie-rating.entity';
import { MovieNote } from '../entities/movie-note.entity';
import { TmdbService } from 'src/lib/tmdb/services/tmdb.service';
import { QueryParams } from 'src/common/interfaces/query.interface';
import { Movie } from 'src/common/interfaces/movie.interface';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(MovieRating)
    private movieRatingRepo: Repository<MovieRating>,
    @InjectRepository(MovieFavorite)
    private movieFavoriteRepo: Repository<MovieFavorite>,
    @InjectRepository(MovieNote)
    private movieNoteRepo: Repository<MovieNote>,
    private tmdbService: TmdbService,
  ) {}

  async getMovies(query: QueryParams) {
    const movies = await this.tmdbService.getPopularMovies(query.page);

    return {
      page: movies.page,
      results: movies.results.map((movie: Movie) => {
        return {
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
          overview: movie.overview,
        };
      }),
    };
  }

  async findMovie(query: QueryParams) {
    const movies = await this.tmdbService.searchMovie(query.search);

    return {
      page: movies.page,
      results: movies.results.map((movie: Movie) => {
        return {
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
          overview: movie.overview,
        };
      }),
    };
  }

  findMovieId(id: number) {
    return this.tmdbService.findMovie(id);
  }

  findMovieRatingLocal(id: number) {
    return this.movieRatingRepo.findOne({
      where: { id },
    });
  }

  findMovieFavoriteLocal(id: number) {
    return this.movieFavoriteRepo.findOne({
      where: { id },
    });
  }

  findMovieNoteLocal(id: number) {
    return this.movieNoteRepo.findOne({
      where: { id },
    });
  }

  rateMovie(data: CreateMovieRatingDto) {
    try {
      const newMovieRate = this.movieRatingRepo.create(data);
      return this.movieRatingRepo.save(newMovieRate);
    } catch (error) {
      throw new HttpException(
        `There was an error trying to save register`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async likeMovie(data: CreateMovieFavoriteDto) {
    try {
      const movieFavoriteExist = await this.findMovieFavoriteLocal(data.id);

      if (movieFavoriteExist) {
        const newStatus =
          movieFavoriteExist.status === 'ACTIVE' ? 'DELETED' : 'ACTIVE';

        this.movieFavoriteRepo.merge(movieFavoriteExist, { status: newStatus });
        return this.movieFavoriteRepo.save(movieFavoriteExist);
      }

      const newMovieFavorite = this.movieFavoriteRepo.create(data);
      return this.movieFavoriteRepo.save(newMovieFavorite);
    } catch (error) {
      throw new HttpException(
        `There was an error trying to save register`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  writeNoteAboutMovie(data: CreateMovieNoteDto) {
    try {
      const newMovieNote = this.movieNoteRepo.create(data);
      return this.movieNoteRepo.save(newMovieNote);
    } catch (error) {
      throw new HttpException(
        `There was an error trying to save register`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateRateMovie(id: number, changes: UpdateMovieRatingDto) {
    const movieRate = await this.findMovieRatingLocal(id);

    if (!movieRate.id) {
      throw new HttpException(
        `Movie with id: [${id} not found]`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      this.movieRatingRepo.merge(movieRate, changes);
      return this.movieRatingRepo.save(movieRate);
    } catch (error) {
      throw new HttpException(
        `There was an error trying to save register`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateNoteAboutMovie(id: number, changes: UpdateMovieNoteDto) {
    const movieNote = await this.findMovieNoteLocal(id);

    console.log('movieNote.success', movieNote);

    if (!movieNote.id) {
      throw new HttpException(
        `Movie with id: [${id} not found]`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      this.movieNoteRepo.merge(movieNote, changes);
      return this.movieNoteRepo.save(movieNote);
    } catch (error) {
      throw new HttpException(
        `There was an error trying to save register`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
