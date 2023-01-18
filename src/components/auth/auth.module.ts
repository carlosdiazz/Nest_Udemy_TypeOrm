import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { config } from './../../config/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // JwtModule.register({
    //   secret: '1234',
    //   signOptions: {
    //     expiresIn: '2h',
    //   },
    // }),

    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       secret: configService.get('JWT_SECRET'),
    //       signOptions: {
    //         expiresIn: configService.get('JWT_EXPIRE'),
    //       },
    //     };
    //   },
    // }),

    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        console.log(configService.JWT.JWT_SECRET);
        return {
          secret: configService.JWT.JWT_SECRET,
          signOptions: {
            expiresIn: configService.JWT.JWT_SECRET,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
