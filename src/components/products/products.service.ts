import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateProductDto,
  UpdateProductDto,
  PaginationDto,
} from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(data: CreateProductDto) {
    try {
      const newProduct = this.productRepository.create(data);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      //console.log(error);
      if (error.code == '23505') {
        throw new BadRequestException(error.detail);
      }
      this.logger.error(error);
      throw new BadRequestException(`${error.message || 'Unexpected Error'}'`);
    }
  }

  async findAll(params: PaginationDto) {
    const { limit = 5, offset = 0 } = params;
    return this.productRepository.findAndCount({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(
        `El Producto con el id ${id} no fue encontrado`,
      );
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.productRepository.delete(id);
  }
}
