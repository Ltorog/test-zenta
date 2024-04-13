import { Test, TestingModule } from '@nestjs/testing';
import { BreedsService } from './breeds.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { SubBreed } from './entities/sub_breed.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

describe('BreedsService', () => {
  let service: BreedsService;

  const BREED_REPOSITORY_TOKEN = getRepositoryToken(Breed);
  const SUB_BREED_REPOSITORY_TOKEN = getRepositoryToken(SubBreed)

  const subBreed1 = new SubBreed();
  subBreed1.id = 1;
  subBreed1.description = 'aleman'

  const subBreed2 = new SubBreed();
  subBreed2.id = 2;
  subBreed2.description = 'frances'

  const resultAllSubBreeds = [subBreed1, subBreed2];


  const breed1 = new Breed();
  breed1.id = 1;
  breed1.description = 'pastor'

  const breed2 = new Breed();
  breed2.id = 1;
  breed2.description = 'pastor'

  const resultAllBreeds = [breed1, breed2];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BreedsService,
        {
          provide: BREED_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(() =>  resultAllBreeds),
          }
        },
        {
          provide: SUB_BREED_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(() => resultAllSubBreeds)
          }
        }
      ],
    }).compile();

    service = module.get<BreedsService>(BreedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get Breeds and Sub breeds', () => {
    it('should find all breeds', async () => {
      const paginationDto = new PaginationDto();
      paginationDto.search = null;

      const breeds = await service.findAllBreeds(paginationDto)
      expect(breeds).toBe(resultAllBreeds)
    });

    it('should find all sub breeds', async () => {
      const paginationDto = new PaginationDto();
      paginationDto.search = null;

      const subBreeds = await service.findAllSubBreeds(paginationDto)
      expect(subBreeds).toBe(resultAllSubBreeds)
    });
  });
});
