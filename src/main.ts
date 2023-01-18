import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Si envio parametros que esten demas, el backend no lo va a recibir
      forbidNonWhitelisted: false, //Aqui si me llegan paramtros demas aviso el error
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, //Aqui transformo para que los query me lleguen en su formato
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();
  await app.listen(process.env.PORT || 3000, () => {
    console.log(
      `👍El server esta arriba en el puerto: ${process.env.PORT || 3000} 👍💪`,
    );
  });
}
bootstrap();
