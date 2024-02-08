const { BaseEntity, Column, Entity, PrimaryGeneratedColumn } = require("typeorm");

@Entity
export class News extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    date!: Date;

    @Column()
    author!: string;
}