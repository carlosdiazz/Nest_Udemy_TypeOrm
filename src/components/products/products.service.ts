import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import {
  CreateProductDto,
  UpdateProductDto,
  PaginationDto,
} from './product.dto';
import { Product } from './product.entity';
import { ProductImage } from './product_image.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(data: CreateProductDto) {
    try {
      const { images = [], ...productDetails } = data;

      const newProduct = this.productRepository.create({
        ...productDetails,
        images: images.map((image) =>
          this.productImageRepository.create({ url: image }),
        ),
      });
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
      relations: {
        images: {},
      },
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
    //const product = await this.findOne(id);
    //try {
    //  this.productRepository.merge(product, {
    //    ...updateProductDto,
    //    images: [],
    //  });
    //  return await this.productRepository.save(product);
    //} catch (error) {
    //  this.logger.error(error);
    //  throw new BadRequestException();
    //}

    const { images, ...toUpdate } = updateProductDto;

    const product = await this.productRepository.preload({
      id: id,
      ...toUpdate,
    });
    if (!product) throw new NotFoundException();

    // Create quary runner
    const queryRunner = this.dataSource.createQueryRunner;

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.productRepository.delete(id);
  }
}
