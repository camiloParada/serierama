import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CatalogService } from '../services/catalog.service';
import {
  CreateMovieRatingDto,
  UpdateMovieRatingDto,
} from '../dtos/movie-rating.dto';
import { CreateMovieFavoriteDto } from '../dtos/movie-favorite.dto';
import { CreateMovieNoteDto, UpdateMovieNoteDto } from '../dtos/movie-note.dto';
import { QueryParams } from 'src/common/interfaces/query.interface';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { Public } from 'src/api/auth/decorators/public.decorator';
import { UserRequest } from 'src/common/interfaces/user-request.interface';

@UseGuards(JwtAuthGuard)
@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Public()
  @Get()
  getMovies(@Query() query: QueryParams) {
    return this.catalogService.getMovies(query);
  }

  @Get('info')
  getMoviesWithLocal(
    @Query() query: QueryParams,
    @Request() request: UserRequest,
  ) {
    return this.catalogService.getMoviesWithLocal(query, request.user.id);
  }

  @Public()
  @Get('search')
  findMovie(@Query() query: QueryParams) {
    return this.catalogService.findMovie(query);
  }

  @Get('search/info')
  findMovieWithLocal(
    @Query() query: QueryParams,
    @Request() request: UserRequest,
  ) {
    return this.catalogService.findMovieWithLocal(query, request.user.id);
  }

  @Get(':id')
  findMovieId(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.findMovieId(id);
  }

  @Post('rate')
  rateMovie(
    @Body() payload: CreateMovieRatingDto,
    @Request() request: UserRequest,
  ) {
    return this.catalogService.rateMovie(payload, request.user.id);
  }

  @Post('like')
  likeMovie(
    @Body() payload: CreateMovieFavoriteDto,
    @Request() request: UserRequest,
  ) {
    return this.catalogService.likeMovie(payload, request.user.id);
  }

  @Post('note')
  writeNoteAboutMovie(
    @Body() payload: CreateMovieNoteDto,
    @Request() request: UserRequest,
  ) {
    return this.catalogService.writeNoteAboutMovie(payload, request.user.id);
  }

  @Put('rate/:id')
  updateRateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateMovieRatingDto,
    @Request() request: UserRequest,
  ) {
    return this.catalogService.updateRateMovie(id, payload, request.user.id);
  }

  @Put('note/:id')
  updateNoteAboutMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateMovieNoteDto,
    @Request() request: UserRequest,
  ) {
    return this.catalogService.updateNoteAboutMovie(
      id,
      payload,
      request.user.id,
    );
  }
}
