import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  slug: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty()
  @IsIn(['men', 'women', 'kid'])
  @MinLength(1)
  gender: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    default: 10,
    description: 'El limit de product',
  })
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'El Skip de product',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset?: number;
}
