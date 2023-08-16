import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

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
  findMovie(@Query() search: string) {
    return this.catalogService.findMovie(search);
  }

  @Post('rate')
  rateMovie(@Body() payload: CreateMovieRatingDto) {
    return this.catalogService.rateMovie(payload);
  }

  @Post('like')
  likeMovie(@Body() payload: CreateMovieFavoriteDto) {
    return this.catalogService.likeMovie(payload);
  }

  @Post('note')
  writeNoteAboutMovie(@Body() payload: CreateMovieNoteDto) {
    return this.catalogService.writeNoteAboutMovie(payload);
  }

  @Put('like/:id')
  updateLikeMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateMovieFavoriteDto,
  ) {
    return this.catalogService.updateLikeMovie(id, payload);
  }

  @Put('rate/:id')
  updateRateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateMovieRatingDto,
  ) {
    return this.catalogService.updateRateMovie(id, payload);
  }

  @Put('note/:id')
  updateNoteAboutMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateMovieNoteDto,
  ) {
    return this.catalogService.updateNoteAboutMovie(id, payload);
  }
}
