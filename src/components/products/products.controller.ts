import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  PaginationDto,
} from './product.dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { PublicRouter } from '../auth/decorator/Public-router.decorator';
import { ValidRoles } from '../auth/interface/valid_roles';
import { GetUser } from '../auth/decorator/get_user.decorator';
import { User } from '../auth/entities/user.entity';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Auth(ValidRoles.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @PublicRouter()
  @Get()
  findAll(@Query() params: PaginationDto) {
    return this.productsService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
