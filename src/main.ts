import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  SwaggerDocumentOptions,
  SwaggerCustomOptions,
} from './swagger-document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});

  const config = new DocumentBuilder()
    .setTitle('title')
    .setDescription('descr')
    .setVersion('0.0.1')
    .addBearerAuth()
    //.addTag('tag')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'My API Docs',
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, customOptions);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }
  if (process.env.NODE_ENV === 'production') {
    app.enableCors({ 
      origin: `*`,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: "Content-Type, Accept",
  
    });
  } else {
    app.enableCors();
  }

  await app.listen(3002);
}
bootstrap();
