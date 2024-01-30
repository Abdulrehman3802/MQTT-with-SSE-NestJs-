import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  // Connection with microservice
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options:{
      url:"mqtt://ssgihegllh3w-bohsowxhmlsv.cedalo.dev:1883",
      username:"techoverflow",
      password:"techoverflow"
    }
  }); 
  
  // await microservice.listen().then(()=>console.log("MQTT Connected")).catch((error)=>{console.log(error);
  // })
  
  await app.startAllMicroservices()
  await app.listen(3001, () => {
    console.log('Server Started on Port : 3001');
  });
}

bootstrap();
