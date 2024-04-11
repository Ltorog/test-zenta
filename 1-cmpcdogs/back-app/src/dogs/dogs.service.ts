import { Repository } from 'typeorm';
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
    console.log({ dog });
    //
    await this.dogsRepository.save(dog);

    return dog;

  }

  async findAll(@Query() paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    console.log({paginationDto});

    const dogs = await this.dogsRepository.find(
      {
        relations: ["id_sub_breed"]
      }
    );

    return dogs
  }

  async findOne(id: number) {
    const dog = this.dogsRepository.findBy({
        id,
        join: {
            alias: "sub_breed",
            innerJoinAndSelect: {
                "description": "sub_breed.description"
            }
        }
    });
    return dog
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    return {'message': `This action updates a #${id} dog`};
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


  private handleDBExceptions( error: any ) {
    if (error.code === '23505' ) {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error)

    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
