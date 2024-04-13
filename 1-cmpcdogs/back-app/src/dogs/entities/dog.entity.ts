import { SubBreed } from "src/breeds/entities/sub_breed.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation, OneToOne, OneToMany } from "typeorm";

@Entity()
export class Dog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: false })
    description: string;


    @Column('text', { nullable: true })
    url_src: string;


    @ManyToOne(() => SubBreed, subBreed => subBreed.dogs, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: 'id_sub_breed' })
    sub_breed: SubBreed; // Define the relationship with SubBreed entity

    // You don't need id_sub_breed column here
}
