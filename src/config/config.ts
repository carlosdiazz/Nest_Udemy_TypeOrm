import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('config', () => {
  return {
    postgres: {
      dbName: process.env.POSTGRES_DB,
      dbUser: process.env.POSTGRES_USER,
      dbPassword: process.env.POSTGRES_PASSWORD,
      dbPort: Number(process.env.DB_PORT),
      dbHost: process.env.DB_HOST,
    },
    JWT: {
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRE: process.env.JWT_EXPIRE,
    },
  };
});

export const validationENV = () => {
  return Joi.object({
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRE: Joi.string().required(),
  });
};

export const enviroments = {
  dev: '.env',
  pro: '.prod.env',
};
