import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

const PostgresMigrations = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  database: configService.get('POSTGRES_DB'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  synchronize: false,
  logging: true,
  entities: ['src/components/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});

export default PostgresMigrations;
