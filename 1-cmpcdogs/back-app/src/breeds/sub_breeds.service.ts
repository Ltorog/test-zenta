import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubBreed } from './entities/sub_breed.entity';
import { Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';

@Injectable()
export class SubBreedsService {

  constructor(
    @InjectRepository(SubBreed)
    private readonly subBreedRepository: Repository<SubBreed>,
  
  ){}

  findAll() {
    return this.subBreedRepository.find();
  }

  findOne(id: number) {
    return this.subBreedRepository.findBy({ id: id });
  }

  async findById(id: any): Promise<SubBreed> {
        return this.subBreedRepository.findOne(id);
    }


}
