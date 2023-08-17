import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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

@UseGuards(JwtAuthGuard)
@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Public()
  @Get()
  getMovies(@Query() query: QueryParams) {
    return this.catalogService.getMovies(query);
  }

  @Public()
  @Get('search')
  findMovie(@Query() query: QueryParams) {
    return this.catalogService.findMovie(query);
  }

  @Get(':id')
  findMovieId(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.findMovieId(id);
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
