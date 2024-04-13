import { Type } from "class-transformer";
import { IsOptional, IsPositive, IsString, Length, Min } from "class-validator";


export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;


    @IsOptional()
    @Min(1)
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsString()
    @Length(0, 64)
    search?: string;


    @IsOptional()
    @Min(0)
    @Type(() => Number)
    id_sub_breed?: number;


    @IsOptional()
    @Min(0)
    @Type(() => Number)
    id_breed?: number;
}