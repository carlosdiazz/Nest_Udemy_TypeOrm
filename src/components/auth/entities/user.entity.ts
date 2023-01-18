import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar', array: true, default: ['user'] })
  roles: string[];
}
