import { Injectable, Query } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubBreed } from './entities/sub_breed.entity';
import { ILike, Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { SubBreedDto } from 'src/common/dtos/sub_breeds.dto';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    @InjectRepository(SubBreed)
    private readonly subBreedRepository: Repository<SubBreed>,
  
  ){}


  async findAllSubBreeds(@Query() subBreedDto: SubBreedDto) {
    const { search = null, id_breed } = subBreedDto

    return this.subBreedRepository.find({
      where: {
        description: ILike(`%${search || ''}%`),
        breed: {
          id: id_breed
        }
      }
    });
  }

  async findAllBreeds(@Query() paginationDto: PaginationDto) {
    const { search = null } = paginationDto

    return this.breedRepository.find({
      where: {
        description: ILike(`%${search || ''}%`)
      }
    });
  }


}
