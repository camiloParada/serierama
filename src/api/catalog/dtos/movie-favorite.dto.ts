import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieFavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  user: string;
}

export class UpdateMovieFavoriteDto extends PartialType(
  CreateMovieFavoriteDto,
) {}
