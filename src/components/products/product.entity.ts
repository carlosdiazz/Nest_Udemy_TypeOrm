import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  //BeforeInsert,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ProductImage } from './product_image.entity';
import { User } from '../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '41a9a6da-a05c-4eed-a86e-0a7bb07f309a',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Producto 1',
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column({ type: 'varchar', unique: true })
  title: string;

  @ApiProperty({
    example: 54,
    description: 'Product Price',
  })
  @Column({ type: 'int' })
  price: number;

  @ApiProperty({
    example: 'Lorem sd dsds f3er reyh fdew',
    description: 'Product Description',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    example: 'Product Grande',
    description: 'Product Slug',
  })
  @Column({ type: 'varchar', unique: true })
  slug: string;

  @ApiProperty({
    example: 1,
    description: 'Product Stock',
  })
  @Column({ type: 'int', default: 0 })
  stock: number;

  @ApiProperty({
    example: ['Grande', 'Product'],
    description: 'Product Sizes',
  })
  @Column({ type: 'text', array: true })
  sizes: string[];

  @ApiProperty({
    example: 'Masculino',
    description: 'Product Gender',
  })
  @Column({ type: 'text' })
  gender: string;

  @ApiProperty({
    example: ['uno', 'dos'],
    description: 'Product Tags',
  })
  @Column({ type: 'varchar', array: true, nullable: true })
  tags: string[];

  @ApiProperty()
  //Con eager true, hago que automaticamente se busque con el metodo find se relacione solo
  @OneToMany(() => ProductImage, (ProductImage) => ProductImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.product, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @ApiProperty()
  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  //@BeforeInsert()
}
