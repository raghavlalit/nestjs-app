import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe());
  app.listen(5000)
  .then(()=>{
    console.log("successfully stared on port 5000");
  })
  .catch((error)=>{
    console.log(error);
  })
}
bootstrap();
