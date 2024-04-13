import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Breed } from 'src/breeds/entities/breed.entity';
import { Dog } from './entities/dog.entity';
import { SubBreed } from 'src/breeds/entities/sub_breed.entity';
import { CreateDogDto } from './dto/create-dog.dto';
import { Repository } from 'typeorm';



export const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('DogsService', () => {
  let dogsService: DogsService;
  let dogsRepository: Repository<Dog>;

  const DOG_REPOSITORY_TOKEN = getRepositoryToken(Dog);
  const SUB_BREED_REPOSITORY_TOKEN = getRepositoryToken(SubBreed)

  const breed = new Breed();
  breed.id = 1;
  breed.description = "pastor";

  const subBreed = new SubBreed();
  subBreed.id = 1;
  subBreed.description = "aleman"
  subBreed.breed = breed;

  const dog = new Dog();
  dog.id = null;
  dog.description = "bobby";
  dog.sub_breed = subBreed;

  const resultAllDogs = [
    dog
  ];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DogsService,
        {
          provide: DOG_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(() =>  resultAllDogs),
            create: jest.fn(() => dog),
            save: jest.fn((dog) => dog.id = 1),
            findOneBy: jest.fn(() => dog),
            remove: jest.fn()
          }
        },
        {
          provide: SUB_BREED_REPOSITORY_TOKEN,
          useValue: {
            findOneBy: jest.fn(() => subBreed)
          }
        }
      ]
    }).compile();

    dogsService = module.get<DogsService>(DogsService);
    dogsRepository = module.get<Repository<Dog>>(DOG_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(dogsService).toBeDefined();
  });

  it('userRepository should be defined', async () => {
    expect(dogsRepository).toBeDefined()
  });

  describe('createDog', () => {
    it('should create a new dog', async () => {
      const dogDto = new CreateDogDto();
      dogDto.description = 'cachupin'
      
      const newDog = await dogsService.create(dogDto)
      expect(newDog.id).toBe(1)
    });
  });

  describe('findAllDogs', () => {
    it('should get array', async () => {
      const paginationDto = new PaginationDto();
      paginationDto.search = null;
      
      const dogs = await dogsService.findAll(paginationDto)
      expect(dogs).toBe(resultAllDogs)
    });

  });

  describe('deleteDog', () => {
    it('should remove dog', async () => {
      const dogId = 1;
      const dogs = await dogsService.remove(dogId)
      expect(dogs).toBe(true)
    });

  });

});
