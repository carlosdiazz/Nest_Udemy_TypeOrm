import { Exclude } from 'class-transformer';
import { Product } from '../../../components/products/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  //@Exclude()
  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  //TODO popner que solo se puedan insertar de la enumeracion que ya tengo
  @Column({ type: 'varchar', array: true, default: ['user'] })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  checkEmail() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkEmaielUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
