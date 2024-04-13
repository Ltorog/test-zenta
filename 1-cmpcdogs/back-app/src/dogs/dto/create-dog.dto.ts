import { IsDefined, IsInt, IsPositive, IsString, MinLength } from "class-validator";

export class CreateDogDto {

    @IsString()
    @MinLength(1)
    @IsDefined()
    description: string;

    @IsInt()
    @IsPositive()
    @IsDefined()
    id_sub_breed: number; // Change the type to number to hold the foreign key value

}