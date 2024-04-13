
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsModule } from './dogs/dogs.module';
import { BreedsModule } from './breeds/breeds.module';
import { Dog } from './dogs/entities/dog.entity';
import { SubBreed } from './breeds/entities/sub_breed.entity';
import { Breed } from './breeds/entities/breed.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      database: 'cmpcdogs',
      username: 'postgres',
      password: 'postgres',
      autoLoadEntities: false,
      synchronize: false,
      entities: [Dog, SubBreed, Breed]
    }),
    DogsModule,
    BreedsModule
  ]
  
})
export class AppModule {}
