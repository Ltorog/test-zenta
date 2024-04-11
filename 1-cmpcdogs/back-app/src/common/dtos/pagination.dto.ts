import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min, isNumber } from "class-validator";


export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;


    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;
}