import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { SubBreed } from "./sub_breed.entity";

@Entity()
export class Breed {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    description: string;

    @OneToMany(
        () => SubBreed, 
        (subBreed) => subBreed.breed, 
        { 
            cascade: true 
        }
    )
    @JoinColumn({ name: 'id', referencedColumnName: 'id_breed'})
    sub_breeds: SubBreed[];

}
