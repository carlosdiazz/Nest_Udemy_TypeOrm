import {
  IsArray,
  IsIn,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @MinLength(1)
  description: string;

  @IsString()
  @MinLength(1)
  slug: string;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsIn(['men', 'women', 'kid'])
  @MinLength(1)
  gender: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
