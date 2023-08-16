import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { CatalogService } from '../services/catalog.service';
import {
  CreateMovieRatingDto,
  UpdateMovieRatingDto,
} from '../dtos/movie-rating.dto';
import {
  CreateMovieFavoriteDto,
  UpdateMovieFavoriteDto,
} from '../dtos/movie-favorite.dto';
import { CreateMovieNoteDto, UpdateMovieNoteDto } from '../dtos/movie-note.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Get(':search')
  findMovie() {}

  @Post('rate')
  rateMovie(@Body() payload: CreateMovieRatingDto) {}

  @Post('like')
  likeMovie(@Body() payload: CreateMovieFavoriteDto) {}

  @Post('note')
  writeNoteAboutMovie(@Body() payload: CreateMovieNoteDto) {}

  @Put('like/:id')
  updateLikeMovie(
    @Param('id') id: string,
    @Body() payload: UpdateMovieFavoriteDto,
  ) {}

  @Put('rate/:id')
  updateRateMovie(
    @Param('id') id: string,
    @Body() payload: UpdateMovieRatingDto,
  ) {}

  @Put('note/:id')
  updateNoteAboutMovie(
    @Param('id') id: string,
    @Body() payload: UpdateMovieNoteDto,
  ) {}
}
