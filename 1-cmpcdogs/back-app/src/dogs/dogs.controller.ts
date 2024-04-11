import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  @Get()
  async findAll(@Query() paginationDto:PaginationDto) {
    return await this.dogsService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dogsService.findOne(+id);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dogsService.remove(+id);
  }
}
