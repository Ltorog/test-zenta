
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsModule } from './dogs/dogs.module';
import { BreedsModule } from './breeds/breeds.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'cmpcdogs',
      username: 'postgres',
      password: 'postgres',
      autoLoadEntities: true,
      synchronize: true
    }),
    DogsModule,
    BreedsModule
  ]
  
})
export class AppModule {}
