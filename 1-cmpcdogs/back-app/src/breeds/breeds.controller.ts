import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { SubBreedDto } from 'src/common/dtos/sub_breeds.dto';

@Controller('')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Get('breeds')
  findAllBreeds(@Query() paginationDto: PaginationDto) {
    return this.breedsService.findAllBreeds(paginationDto);
  }

  @Get('sub-breeds')
  findAllSubBreeds(@Query() subBreedDto: SubBreedDto) {
    return this.breedsService.findAllSubBreeds(subBreedDto);
  }

}
