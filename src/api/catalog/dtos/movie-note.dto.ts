import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieNoteDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  note: string;

  @IsOptional()
  @IsString()
  user: string;
}

export class UpdateMovieNoteDto extends PartialType(CreateMovieNoteDto) {}
