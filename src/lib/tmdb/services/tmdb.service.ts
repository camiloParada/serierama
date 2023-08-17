import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { catchError, lastValueFrom } from 'rxjs';

import config from 'src/config';

@Injectable()
export class TmdbService {
  private apiKey: string;
  private url: string;

  constructor(
    private httpService: HttpService,
    @Inject(config.KEY) configService: ConfigType<typeof config>,
  ) {
    this.apiKey = configService.tmdb.apiKey;
    this.url = 'https://api.themoviedb.org/3';
  }

  async getPopularMovies(page: number = 1) {
    const response = this.httpService
      .get(`${this.url}/movie/popular?api_key=${this.apiKey}&page=${page}`)
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
    const result = await lastValueFrom(response);

    return result.data;
  }

  async searchMovie(search: string) {
    const response = this.httpService
      .get(`${this.url}/search/movie?api_key=${this.apiKey}&query=${search}`)
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
    const result = await lastValueFrom(response);

    return result.data;
  }

  async findMovie(id: number) {
    const response = this.httpService
      .get(`${this.url}/movie/${id}?api_key=${this.apiKey}`)
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
    const result = await lastValueFrom(response);

    return result.data;
  }
}
