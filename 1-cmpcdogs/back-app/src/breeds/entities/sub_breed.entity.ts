import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Breed } from "./breed.entity";
import { Dog } from "src/dogs/entities/dog.entity";

@Entity()
export class SubBreed {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    description: string;

    @ManyToOne(
        () => Breed, 
        (breed) => breed.sub_breeds, 
        { 
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE', 
            nullable: false 
        }
    )
    @JoinColumn({ name: 'id_breed' })
    breed: Breed;

    @OneToMany(
        () => Dog, 
        (dog) => dog.sub_breed, // Define the property in Dog entity to join with
        { 
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE', 
            nullable: false 
        })
    dogs: Dog[]; // Define the property to hold related dogs
}