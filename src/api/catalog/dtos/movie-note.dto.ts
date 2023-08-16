import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieNoteDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  note: string;

  @IsNotEmpty()
  @IsString()
  user: string;
}

export class UpdateMovieNoteDto extends PartialType(CreateMovieNoteDto) {}
