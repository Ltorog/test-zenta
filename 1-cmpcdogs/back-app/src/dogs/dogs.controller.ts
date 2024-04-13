import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  async create(@Body() createDogDto: CreateDogDto) {
    return await this.dogsService.create(createDogDto);
  }

  @Get()
  async findAll(@Query() paginationDto:PaginationDto) {
    const { dogs, pagination } = await this.dogsService.findAll(paginationDto);

    return {
      data: dogs,
      pagination: pagination
    }
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
