import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieFavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  user: string;
}

export class UpdateMovieFavoriteDto extends PartialType(
  CreateMovieFavoriteDto,
) {}
