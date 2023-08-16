import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

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
    const response = this.httpService.get(`${this.url}/movies/popular?${page}`);
    const result = await lastValueFrom(response);

    return result.data;
  }

  async searchMovie(search: string) {
    const response = this.httpService.get(
      `${this.url}/search/movie?query=${search}`,
    );
    const result = await lastValueFrom(response);

    return result.data;
  }
}
