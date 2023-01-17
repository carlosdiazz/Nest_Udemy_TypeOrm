import { Module } from '@nestjs/common';
import { ConfigType, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import { config, enviroments, validationENV } from './config/config';
import { ProductsModule } from './components/products/products.module';
import { FilesModule } from './components/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: validationENV(),
    }),
    //TypeOrmModule.forRoot({
    //  type: 'postgres',
    //  host: process.env.DB_HOST,
    //  port: +process.env.DB_PORT,
    //  database: process.env.POSTGRES_DB,
    //  username: process.env.POSTGRES_USER,
    //  password: process.env.POSTGRES_PASSWORD,
    //  autoLoadEntities: true,
    //  synchronize: true,
    //}),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) =>
        ({
          type: 'postgres',
          host: configService.postgres.dbHost,
          port: configService.postgres.dbPort,
          database: configService.postgres.dbName,
          username: configService.postgres.dbUser,
          password: configService.postgres.dbPassword,
          //synchronize: true,
          autoLoadEntities: true,
        } as DataSourceOptions),
    }),
    ProductsModule,
    FilesModule,
  ],
})
export class AppModule {}
