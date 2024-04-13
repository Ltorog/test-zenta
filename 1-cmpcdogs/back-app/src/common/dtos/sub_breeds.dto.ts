import { Type } from "class-transformer";
import { IsDefined, IsOptional, IsPositive, IsString, Length, Min } from "class-validator";


export class SubBreedDto {


    @IsOptional()
    @IsString()
    @Length(0, 64)
    search?: string;


    @Min(0)
    @IsDefined()
    @Type(() => Number)
    id_breed: number;
}