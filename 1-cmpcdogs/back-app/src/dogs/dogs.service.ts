import { ILike, Repository } from 'typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Query } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Dog } from './entities/dog.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { SubBreed } from '../breeds/entities/sub_breed.entity';


@Injectable()
export class DogsService {

  private readonly logger = new Logger('ProductsService')
  
  constructor(
    @InjectRepository(Dog)
    private readonly dogsRepository: Repository<Dog>,
    @InjectRepository(SubBreed)
    private readonly subBreedRepository: Repository<SubBreed>
  ){}

  async create(createDogDto: CreateDogDto) {
    console.log("DOG DTO", { createDogDto })
    
    const subBreed = await this.subBreedRepository.findOneBy({ id: createDogDto.id_sub_breed })

    console.log({ subBreed })
    if (!subBreed) {
      throw new BadRequestException(`sub breed ${createDogDto.id_sub_breed} not exists`);
    }

    const dog = this.dogsRepository.create(createDogDto);
    dog.sub_breed = subBreed;
    console.log({ dog });
    //
    await this.dogsRepository.save(dog);

    return dog;

  }

  async findAll(@Query() paginationDto: PaginationDto) {

    const { limit = 10, page = 1, search = null, id_sub_breed = null, id_breed = null } = paginationDto;

    const offset = limit*(page-1);

    const dogs = await this.dogsRepository.find({
      take: limit,
      skip: offset,
      relations: ['sub_breed', 'sub_breed.breed'],
      where: {
        description: ILike(`%${search || ''}%`),
        sub_breed: {
          id: id_sub_breed,
          breed: {
            id: id_breed
          }
        }
      }
    });

    const dogsTotal = await this.dogsRepository.count({
      relations: ['sub_breed', 'sub_breed.breed'],
      where: {
        description: ILike(`%${search || ''}%`),
        sub_breed: {
          id: id_sub_breed,
          breed: {
            id: id_breed
          }
        }
      }
    });

    const total_page = Math.ceil(dogsTotal / limit); 
    const pagination = {
      total: dogsTotal,
      page: page,
      total_pages: total_page
    } 

    return {dogs, pagination}
  }

  async findOne(id: number) {
    const dog = this.dogsRepository.findBy({id});
    return dog
  }

  async remove(id: number) {
    const dog = await this.dogsRepository.findOneBy({ id });

    if (!dog) {
      throw new NotFoundException('Dog not found')
    }

    try {
      await this.dogsRepository.remove(dog);
      return true
    }
    catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error delete dog')
    }
  }
}
