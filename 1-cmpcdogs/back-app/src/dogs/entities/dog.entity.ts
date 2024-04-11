import { SubBreed } from "src/breeds/entities/sub_breed.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation, OneToOne, OneToMany } from "typeorm";

@Entity()
export class Dog {
    //
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {
        nullable: false
    })
    description: string;


    @OneToMany(
        () => SubBreed, 
        (subBreed) => subBreed.id, 
        { 
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE', 
            nullable: false 
        }
    )
    @JoinColumn({ name: 'id_sub_breed' })
    sub_breed: SubBreed;

    @Column()
    id_sub_breed: number;
}
