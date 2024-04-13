import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Breed } from 'src/breeds/entities/breed.entity';
import { CreateDogDto } from './dto/create-dog.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Dog } from './entities/dog.entity';
import { SubBreed } from 'src/breeds/entities/sub_breed.entity';

describe('DogsController', () => {
  let module: TestingModule;
  let dogsController: DogsController;
  let dogsService: DogsService;

  const breed = new Breed();
  breed.id = 1;
  breed.description = 'pastor'

  const subBreed = new SubBreed();
  subBreed.id = 1
  subBreed.description = 'aleman'

  const dog = new Dog();
  dog.id = 1;
  dog.description = 'cachupin'

  dog.sub_breed = subBreed;
  dog.sub_breed.breed = breed

  const resultAll = [
    dog
  ];

  const mockDogsService = {
    findAll: () => (resultAll),
    create: () => (dog)
  };

  const dogsServiceProvider = {
    provide: DogsService,
    useValue: mockDogsService,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [dogsServiceProvider],
    }).compile();

    dogsService = module.get<DogsService>(DogsService);
    dogsController = module.get<DogsController>(DogsController);
  });

  it('should be defined', () => {
    expect(dogsService).toBeDefined();
  });

  describe('dog tests', () => {
    it('should return all dogs', async () => {
      const paginationDto = new PaginationDto();

      jest.spyOn(dogsService, 'findAll').mockResolvedValue(resultAll);
      const dogs = await dogsController.findAll(paginationDto)
      expect(dogs).toStrictEqual(resultAll);
    });

    it('should return nothing dogs', async () => {
      const paginationDto = new PaginationDto();
      paginationDto.search = 'boby';
      
      jest.spyOn(dogsService, 'findAll').mockResolvedValue([]);
      const dogs = await dogsController.findAll(paginationDto);
      expect(dogs).toStrictEqual([]);
    });

    it('should return dog creation', async () => {
      const dogDto = new CreateDogDto();
      dogDto.description = 'cachupin';
      dogDto.id_sub_breed = 1;

      const dogEntity = new Dog();
      dogEntity.description = 'cachupin';
      dogEntity.sub_breed = subBreed;

      jest.spyOn(dogsService, 'create').mockResolvedValue(dogEntity);
      const newDog = await dogsController.create(dogDto);
      expect(newDog).toStrictEqual(dogEntity);
    });
  });
});
