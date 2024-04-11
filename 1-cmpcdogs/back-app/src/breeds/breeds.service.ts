import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubBreed } from './entities/sub_breed.entity';
import { Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  
  ){}

  create(createBreedDto: CreateBreedDto) {
    return 'This action adds a new breed';
  }

  findAll() {
    return `This action returns all breeds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} breed`;
  }


  update(id: number, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} breed`;
  }

  remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
