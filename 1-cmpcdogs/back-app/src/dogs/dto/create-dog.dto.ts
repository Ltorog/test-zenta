import { IsDefined, IsInt, IsPositive, IsString, MinLength } from "class-validator";
import { SubBreed } from "src/breeds/entities/sub_breed.entity";
import { AfterInsert, Relation } from "typeorm";


export class CreateDogDto {

    @IsString()
    @MinLength(1)
    @IsDefined()
    description: string;

    @IsInt()
    @IsPositive()
    @IsDefined()
    id_sub_breed: number;

}