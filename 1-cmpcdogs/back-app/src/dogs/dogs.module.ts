import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { SubBreed } from 'src/breeds/entities/sub_breed.entity';


@Module({
  controllers: [DogsController],
  providers: [DogsService],
  imports: [
    TypeOrmModule.forFeature([Dog, SubBreed])
  ]
})
export class DogsModule {}
